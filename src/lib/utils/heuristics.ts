import type { READMESection, SectionType } from './sections';
import { generateId, createSection } from './sections';

// Standard mapping of technologies to Shields.io badge structures
export const BADGE_REGISTRY: Record<string, { label: string; message: string; color: string; logo: string }> = {
  svelte: { label: 'Svelte', message: 'Svelte', color: 'FF3E00', logo: 'svelte' },
  sveltekit: { label: 'SvelteKit', message: 'SvelteKit', color: 'FF3E00', logo: 'svelte' },
  typescript: { label: 'TypeScript', message: 'TypeScript', color: '3178C6', logo: 'typescript' },
  tailwindcss: { label: 'Tailwind CSS', message: 'TailwindCSS', color: '06B6D4', logo: 'tailwindcss' },
  vite: { label: 'Vite', message: 'Vite', color: '646CFF', logo: 'vite' },
  react: { label: 'React', message: 'React', color: '61DAFB', logo: 'react' },
  vue: { label: 'Vue', message: 'Vue.js', color: '4FC08D', logo: 'vue.js' },
  nextjs: { label: 'Next.js', message: 'Next.js', color: '000000', logo: 'next.js' },
  django: { label: 'Django', message: 'Django', color: '092E20', logo: 'django' },
  fastapi: { label: 'FastAPI', message: 'FastAPI', color: '009688', logo: 'fastapi' },
  flask: { label: 'Flask', message: 'Flask', color: '000000', logo: 'flask' },
  postgresql: { label: 'PostgreSQL', message: 'PostgreSQL', color: '4169E1', logo: 'postgresql' },
  supabase: { label: 'Supabase', message: 'Supabase', color: '3ECF8E', logo: 'supabase' },
  docker: { label: 'Docker', message: 'Docker', color: '2496ED', logo: 'docker' },
  python: { label: 'Python', message: 'Python', color: '3776AB', logo: 'python' },
  nodejs: { label: 'Node.js', message: 'Node.js', color: '339933', logo: 'nodejs' },
  express: { label: 'Express', message: 'Express', color: '000000', logo: 'express' },
  prisma: { label: 'Prisma', message: 'Prisma', color: '2D3748', logo: 'prisma' },
  graphql: { label: 'GraphQL', message: 'GraphQL', color: 'E10098', logo: 'graphql' }
};

// Interface of scanned assets payload returned by scanner server
export interface RepoScanPayload {
  projectName: string;
  description: string;
  isNode: boolean;
  isPython: boolean;
  packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'pip' | 'unknown';
  installCommands: string;
  runCommands: string;
  detectedTechnologies: string[];
  envVars: Array<{ name: string; description: string; defaultValue: string }>;
  license: { type: string; author: string; year: string } | null;
  screenshots: Array<{ url: string; alt: string; caption: string }>;
  folderTree: string;
  existingReadme: string | null;
}

// Parses environment variable declarations from standard .env.example files
export function parseEnvExample(content: string): Array<{ name: string; description: string; defaultValue: string }> {
  const lines = content.split('\n');
  const vars: Array<{ name: string; description: string; defaultValue: string }> = [];
  
  let lastComment = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      lastComment = '';
      continue;
    }
    
    if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
      // Clean comment tags to serve as the variable's description field
      lastComment = trimmed.replace(/^#+\s*/, '').replace(/^\/\/+\s*/, '').trim();
      continue;
    }
    
    if (trimmed.includes('=')) {
      const parts = trimmed.split('=');
      const name = parts[0].trim();
      if (name && /^[A-Z0-9_]+$/i.test(name)) {
        const defaultValue = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
        vars.push({
          name,
          description: lastComment || `Configuration variable for ${name}`,
          defaultValue
        });
        lastComment = '';
      }
    }
  }
  return vars;
}

// Parses license headers to extract license types, copyright holders, and publication years
export function parseLicense(content: string): { type: string; author: string; year: string } {
  let type = 'MIT';
  const norm = content.toLowerCase();
  
  if (norm.includes('apache')) {
    type = 'Apache 2.0';
  } else if (norm.includes('gnu') || norm.includes('gpl')) {
    type = 'GPL v3';
  } else if (norm.includes('bsd')) {
    type = 'BSD 3-Clause';
  } else if (norm.includes('unlicense')) {
    type = 'Unlicense';
  }

  // Regex to extract year and author from license copyright claims
  const copyrightMatch = content.match(/Copyright\s+(?:\(c\)\s+)?(\d{4})\s+(.+)/i) || 
                         content.match(/Copyright\s+(.+)\s+(\d{4})/i);
  
  let year = new Date().getFullYear().toString();
  let author = 'Project Contributors';

  if (copyrightMatch) {
    if (copyrightMatch[1] && /^\d{4}$/.test(copyrightMatch[1].trim())) {
      year = copyrightMatch[1].trim();
      author = copyrightMatch[2].trim().split('\n')[0].replace(/\r/g, '');
    } else if (copyrightMatch[2] && /^\d{4}$/.test(copyrightMatch[2].trim())) {
      year = copyrightMatch[2].trim();
      author = copyrightMatch[1].trim().split('\n')[0].replace(/\r/g, '');
    }
  }

  return { type, author, year };
}

// Infers the folder structure tree from GitHub Contents API root folders list
export function generateFolderTree(contents: any[], rootName = 'project-root'): string {
  let tree = `${rootName}/\n`;
  
  // Sort folders first, then files alphabetically
  const sorted = [...contents].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'dir' ? -1 : 1;
  });

  const topLevelItems = sorted.slice(0, 15); // Cap to preserve size
  topLevelItems.forEach((item, idx) => {
    const isLast = idx === topLevelItems.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    tree += `${connector}${item.name}${item.type === 'dir' ? '/' : ''}\n`;
  });
  
  if (sorted.length > 15) {
    tree += `└── ... (${sorted.length - 15} more files/directories)\n`;
  }
  
  return tree;
}

// Compiles scanned payload results into standard visual widget arrays
export function compileScannedReadme(payload: RepoScanPayload): READMESection[] {
  const sections: READMESection[] = [];

  // 1. Title Widget
  const title = createSection('title');
  title.content.text = `🚀 ${payload.projectName || 'My Repository'}`;
  title.content.subtitle = payload.description || 'A professional application constructed with modern workflows.';
  sections.push(title);

  // 2. Description Widget
  const description = createSection('description');
  description.content.text = payload.description 
    ? `${payload.description}\n\nThis project was scanned and generated automatically using README Builder. It is fully customizable, fast, and structured for developers.`
    : `This repository contains the source code for **${payload.projectName}**. An intelligent, developer-centric solution compiled with performance in mind.`;
  sections.push(description);

  // 3. Tech Stack Widget (Badges)
  const techStack = createSection('tech-stack');
  techStack.content.badges = [];
  payload.detectedTechnologies.forEach((tech) => {
    const key = tech.toLowerCase().replace(/[^a-z]/g, '');
    if (BADGE_REGISTRY[key]) {
      techStack.content.badges.push({ ...BADGE_REGISTRY[key] });
    } else {
      // Generate a dynamic generic badge for uncatalogued dependencies
      techStack.content.badges.push({
        label: tech,
        message: tech,
        color: '475569', // Slate grey
        logo: ''
      });
    }
  });
  
  // If no badges detected, load standard defaults
  if (techStack.content.badges.length === 0) {
    if (payload.isNode) {
      techStack.content.badges.push({ ...BADGE_REGISTRY['nodejs'] });
      techStack.content.badges.push({ ...BADGE_REGISTRY['typescript'] });
    } else if (payload.isPython) {
      techStack.content.badges.push({ ...BADGE_REGISTRY['python'] });
    }
  }
  sections.push(techStack);

  // 4. Installation Widget
  const installation = createSection('installation');
  installation.content.prerequisites = payload.isNode 
    ? 'Node.js v18 or higher\nnpm or pnpm package manager' 
    : payload.isPython 
      ? 'Python 3.9 or higher\npip package manager'
      : 'Standard runtime environment';
  installation.content.commands = payload.installCommands;
  sections.push(installation);

  // 5. Usage Widget
  const usage = createSection('usage');
  if (payload.isNode) {
    usage.content.description = 'Start the local development server to run the application:';
    usage.content.codeBlock = payload.runCommands;
    usage.content.language = 'bash';
  } else if (payload.isPython) {
    usage.content.description = 'Execute the entry point module to launch:';
    usage.content.codeBlock = 'python main.py';
    usage.content.language = 'bash';
  }
  sections.push(usage);

  // 6. Environment Variables (Only if env vars exist)
  if (payload.envVars && payload.envVars.length > 0) {
    const envWidget = createSection('env-vars');
    envWidget.content.vars = payload.envVars.map(v => ({
      name: v.name,
      description: v.description,
      defaultValue: v.defaultValue
    }));
    sections.push(envWidget);
  }

  // 7. Folder Structure Tree
  const folderWidget = createSection('folder-structure');
  folderWidget.content.tree = payload.folderTree;
  folderWidget.content.explanation = 'Detailed snapshot listing primary directory folders and config points.';
  sections.push(folderWidget);

  // 8. Screenshots Gallery (Only if screenshots scanned)
  if (payload.screenshots && payload.screenshots.length > 0) {
    const screenshotWidget = createSection('screenshots');
    screenshotWidget.content.images = payload.screenshots;
    screenshotWidget.content.style = 'grid';
    sections.push(screenshotWidget);
  }

  // 9. Contribution Guide
  sections.push(createSection('contributing'));

  // 10. License
  const licenseWidget = createSection('license');
  if (payload.license) {
    licenseWidget.content.type = payload.license.type;
    licenseWidget.content.author = payload.license.author;
    licenseWidget.content.year = payload.license.year;
  }
  sections.push(licenseWidget);

  return sections;
}
