import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parseEnvExample, parseLicense, generateFolderTree } from '$lib/utils/heuristics';
import { validateGitHubHandle, validateRepositoryName, validateBranchName, getErrorMessage } from '$lib/utils/validation';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const token = cookies.get('github_token');
  if (!token) {
    throw error(401, 'Unauthorized: Connect your GitHub account first');
  }

  const owner = url.searchParams.get('owner');
  const repo = url.searchParams.get('repo');
  const branch = url.searchParams.get('branch') || 'main';

  if (!owner || !repo) {
    throw error(400, 'Owner and Repository query parameters are required');
  }

  // Validate GitHub handle and repository name format
  if (!validateGitHubHandle(owner)) {
    throw error(400, 'Invalid repository owner format');
  }
  if (!validateRepositoryName(repo)) {
    throw error(400, 'Invalid repository name format');
  }
  if (!validateBranchName(branch)) {
    throw error(400, 'Invalid branch name format');
  }

  try {
    // 1. Fetch root directory contents
    const rootUrl = `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
    const rootRes = await fetch(rootUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'README-Builder'
      }
    });

    if (!rootRes.ok) {
      throw error(rootRes.status, `Failed to scan repository contents: ${rootRes.statusText}`);
    }

    const rootItems = await rootRes.json();
    if (!Array.isArray(rootItems)) {
      throw error(500, 'Failed to parse repository structure');
    }

    // 2. Identify key files from contents
    const filesMap = new Map<string, any>();
    rootItems.forEach(item => {
      filesMap.set(item.name.toLowerCase(), item);
    });

    let projectName = repo;
    let description = '';
    const isNode = filesMap.has('package.json');
    const isPython = filesMap.has('requirements.txt');
    let pm: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'pip' | 'unknown' = 'unknown';
    let installCommands = '';
    let runCommands = '';
    const detectedTech = new Set<string>();

    // Lockfile detection
    const hasPnpmLock = filesMap.has('pnpm-lock.yaml');
    const hasYarnLock = filesMap.has('yarn.lock');
    const hasBunLock = filesMap.has('bun.lockb');

    if (isNode) {
      if (hasPnpmLock) {
        pm = 'pnpm';
        installCommands = 'pnpm install';
        runCommands = 'pnpm dev';
      } else if (hasYarnLock) {
        pm = 'yarn';
        installCommands = 'yarn install';
        runCommands = 'yarn dev';
      } else if (hasBunLock) {
        pm = 'bun';
        installCommands = 'bun install';
        runCommands = 'bun dev';
      } else {
        pm = 'npm';
        installCommands = 'npm install';
        runCommands = 'npm run dev';
      }
      detectedTech.add('Node.js');
    } else if (isPython) {
      pm = 'pip';
      installCommands = 'pip install -r requirements.txt';
      runCommands = 'python main.py';
      detectedTech.add('Python');
    } else {
      installCommands = `# Clone the repository\ngit clone https://github.com/${owner}/${repo}.git\n\n# Navigate to folder\ncd ${repo}`;
      runCommands = '# Compile/build instructions';
    }

    // Config files indicators
    if (filesMap.has('tailwind.config.js') || filesMap.has('tailwind.config.ts') || filesMap.has('tailwind.config.cjs')) {
      detectedTech.add('Tailwind CSS');
    }
    if (filesMap.has('vite.config.ts') || filesMap.has('vite.config.js')) {
      detectedTech.add('Vite');
    }
    if (filesMap.has('svelte.config.js') || filesMap.has('svelte.config.ts')) {
      detectedTech.add('Svelte');
      detectedTech.add('SvelteKit');
    }
    if (filesMap.has('docker-compose.yml') || filesMap.has('dockerfile')) {
      detectedTech.add('Docker');
    }
    if (filesMap.has('tsconfig.json')) {
      detectedTech.add('TypeScript');
    }

    // Secure async raw content fetch helper
    const fetchRawFile = async (path: string): Promise<string | null> => {
      const item = filesMap.get(path.toLowerCase());
      if (!item) return null;
      try {
        const fileRes = await fetch(item.url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3.raw', // Retrieve plain text string
            'User-Agent': 'README-Builder'
          }
        });
        if (fileRes.ok) {
          return await fileRes.text();
        }
      } catch (err) {
        console.error(`Failed to fetch file contents for ${path}:`, err);
      }
      return null;
    };

    // A. Package.json details extraction
    if (isNode) {
      const pkgJson = await fetchRawFile('package.json');
      if (pkgJson) {
        try {
          const packageJsonData = JSON.parse(pkgJson);
          if (packageJsonData.name) projectName = packageJsonData.name;
          if (packageJsonData.description) description = packageJsonData.description;

          // Enrich run scripts
          if (packageJsonData.scripts) {
            if (packageJsonData.scripts.dev) {
              runCommands = pm === 'npm' ? 'npm run dev' : `${pm} dev`;
            } else if (packageJsonData.scripts.start) {
              runCommands = pm === 'npm' ? 'npm start' : `${pm} start`;
            }
          }

          // Search common packages in dependencies
          const allDeps = [
            ...Object.keys(packageJsonData.dependencies || {}),
            ...Object.keys(packageJsonData.devDependencies || {})
          ];
          const mappings: Record<string, string> = {
            'svelte': 'Svelte',
            '@sveltejs/kit': 'SvelteKit',
            'react': 'React',
            'vue': 'Vue',
            'next': 'Next.js',
            'django': 'Django',
            'fastapi': 'FastAPI',
            'flask': 'Flask',
            'postgresql': 'PostgreSQL',
            'pg': 'PostgreSQL',
            'supabase': 'Supabase',
            'express': 'Express',
            'typescript': 'TypeScript',
            'tailwindcss': 'Tailwind CSS',
            'vite': 'Vite',
            'prisma': 'Prisma',
            'graphql': 'GraphQL',
            'docker': 'Docker'
          };
          allDeps.forEach(dep => {
            for (const key in mappings) {
              if (dep.includes(key)) {
                detectedTech.add(mappings[key]);
              }
            }
          });
        } catch (err) {
          console.error('Error parsing package.json details:', err);
        }
      }
    }

    // B. requirements.txt details
    if (isPython) {
      const reqs = await fetchRawFile('requirements.txt');
      if (reqs) {
        const mappings: Record<string, string> = {
          'django': 'Django',
          'fastapi': 'FastAPI',
          'flask': 'Flask',
          'numpy': 'NumPy',
          'pandas': 'Pandas',
          'postgres': 'PostgreSQL',
          'psycopg2': 'PostgreSQL',
          'docker': 'Docker'
        };
        reqs.split('\n').forEach(line => {
          const cleaned = line.trim().toLowerCase();
          for (const key in mappings) {
            if (cleaned.includes(key)) {
              detectedTech.add(mappings[key]);
            }
          }
        });
      }
    }

    // C. Environment variables extraction
    let envVars: any[] = [];
    if (filesMap.has('.env.example')) {
      const envText = await fetchRawFile('.env.example');
      if (envText) {
        envVars = parseEnvExample(envText);
      }
    }

    // D. License extraction
    let license: any = null;
    const licenseFile = filesMap.get('license') || filesMap.get('license.md') || filesMap.get('license.txt');
    if (licenseFile) {
      const licText = await fetchRawFile(licenseFile.name);
      if (licText) {
        license = parseLicense(licText);
      }
    }

    // E. Existing README extraction
    let existingReadme: string | null = null;
    const readmeFile = filesMap.get('readme.md') || filesMap.get('readme');
    if (readmeFile) {
      existingReadme = await fetchRawFile(readmeFile.name);
    }

    // F. Screenshots and Images directories scan
    const screenshots: any[] = [];
    const scanImagesFolder = async (folderName: string) => {
      const item = filesMap.get(folderName.toLowerCase());
      if (item && item.type === 'dir') {
        try {
          const listRes = await fetch(item.url, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github+json',
              'User-Agent': 'README-Builder'
            }
          });
          if (listRes.ok) {
            const files = await listRes.json();
            if (Array.isArray(files)) {
              files.forEach(f => {
                if (f.type === 'file' && /\.(png|jpe?g|gif|svg|webp)$/i.test(f.name)) {
                  screenshots.push({
                    url: `./${folderName}/${f.name}`,
                    alt: f.name.replace(/\.[^/.]+$/, ''),
                    caption: `Screenshot preview of ${f.name}`
                  });
                }
              });
            }
          }
        } catch (err) {
          console.error(`Failed to scan image folder ${folderName}:`, err);
        }
      }
    };
    await scanImagesFolder('screenshots');
    await scanImagesFolder('images');

    // G. Folder tree construction
    const folderTree = generateFolderTree(rootItems, repo);

    const payload = {
      projectName,
      description,
      isNode,
      isPython,
      packageManager: pm,
      installCommands,
      runCommands,
      detectedTechnologies: Array.from(detectedTech),
      envVars,
      license,
      screenshots,
      folderTree,
      existingReadme
    };

    return json(payload);
  } catch (err: unknown) {
    console.error('Scan sequence failed:', err);
    const errorMessage = getErrorMessage(err);
    console.error('Error details:', errorMessage);
    throw error(500, 'Failed to scan repository. Please verify the repository is accessible.');
  }
};
