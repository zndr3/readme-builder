/**
 * GitHub Asset Service
 * Handles uploading images and GIFs to GitHub repositories
 * 
 * Responsibilities:
 * - Upload images to .github/assets/
 * - Handle filename collisions
 * - Generate repository paths
 * - Encode files to Base64 for GitHub API
 * - Return final URLs for markdown generation
 */

import { generateRepositoryPath, handleFileNameCollision } from '../utils/asset-validation';

export interface UploadAssetOptions {
  owner: string;
  repo: string;
  branch: string;
  token: string; // GitHub token from session
}

export interface AssetUploadResult {
  success: boolean;
  fileName: string;
  repositoryPath: string;
  htmlUrl?: string;
  downloadUrl?: string;
  message?: string;
}

/**
 * Convert File to Base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract Base64 part (remove data:image/png;base64, prefix)
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Check if a file exists in the repository at given path
 */
async function checkFileExists(
  owner: string,
  repo: string,
  path: string,
  branch: string,
  token: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'README-Builder'
        }
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get the SHA of an existing file (needed for updates)
 */
async function getFileSha(
  owner: string,
  repo: string,
  path: string,
  branch: string,
  token: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'README-Builder'
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * List all files in .github/assets/ directory to check for collisions
 */
async function getExistingAssetFileNames(
  owner: string,
  repo: string,
  branch: string,
  token: string
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/.github/assets?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'README-Builder'
        }
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return data.map((file: any) => file.name);
  } catch {
    return [];
  }
}

/**
 * Upload a single asset file to GitHub
 * 
 * Flow:
 * 1. Validate file format and size (done before calling this)
 * 2. Check for filename collisions
 * 3. Encode file to Base64
 * 4. Upload via GitHub API
 * 5. Return repository path
 */
export async function uploadAsset(
  file: File,
  options: UploadAssetOptions
): Promise<AssetUploadResult> {
  const { owner, repo, branch, token } = options;

  try {
    // 1. Check for filename collisions in the repository
    const existingFiles = await getExistingAssetFileNames(owner, repo, branch, token);
    const finalFileName = handleFileNameCollision(file.name, existingFiles);
    
    // 2. Generate repository path
    const repositoryPath = generateRepositoryPath(finalFileName);

    // 3. Check if file already exists (get SHA for update)
    const existingSha = await getFileSha(owner, repo, repositoryPath, branch, token);

    // 4. Convert file to Base64
    const base64Content = await fileToBase64(file);

    // 5. Upload to GitHub
    const uploadUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${repositoryPath}`;
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        'User-Agent': 'README-Builder'
      },
      body: JSON.stringify({
        message: `docs: add asset ${finalFileName} to README`,
        content: base64Content,
        branch,
        sha: existingSha // Include SHA if file exists (for updates)
      })
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      console.error('GitHub API error:', errorData);
      return {
        success: false,
        fileName: finalFileName,
        repositoryPath,
        message: `Failed to upload file: ${uploadResponse.statusText}`
      };
    }

    const uploadData = await uploadResponse.json();

    return {
      success: true,
      fileName: finalFileName,
      repositoryPath,
      htmlUrl: uploadData.content.html_url,
      downloadUrl: uploadData.content.download_url
    };
  } catch (error) {
    console.error('Asset upload error:', error);
    return {
      success: false,
      fileName: file.name,
      repositoryPath: generateRepositoryPath(file.name),
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Upload multiple assets
 * Returns array of upload results
 */
export async function uploadAssets(
  files: File[],
  options: UploadAssetOptions
): Promise<AssetUploadResult[]> {
  const results: AssetUploadResult[] = [];

  for (const file of files) {
    try {
      const result = await uploadAsset(file, options);
      results.push(result);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
      results.push({
        success: false,
        fileName: file.name,
        repositoryPath: generateRepositoryPath(file.name),
        message: 'Upload failed'
      });
    }
  }

  return results;
}

/**
 * Generate final markdown image tag
 * Uses repository path (.github/assets/filename)
 */
export function generateImageMarkdown(
  altText: string,
  repositoryPath: string,
  caption?: string
): string {
  let md = `![${altText}](${repositoryPath})`;
  if (caption) {
    md += `\n\n*${caption}*`;
  }
  return md;
}
