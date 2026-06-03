import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateGitHubHandle, validateRepositoryName, validateBranchName, getErrorMessage } from '$lib/utils/validation';

export interface AssetUploadPayload {
  fileName: string;
  base64Content: string;
  repositoryPath: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = cookies.get('github_token');
  if (!token) {
    throw error(401, 'Unauthorized: Please connect your GitHub account first');
  }

  try {
    const { owner, repo, markdown, commitMessage, branch, assets } = await request.json();

    if (!owner || !repo || !markdown) {
      throw error(400, 'Parameters owner, repo, and markdown content are required');
    }

    // Validate GitHub handle and repository name format
    if (!validateGitHubHandle(owner)) {
      throw error(400, 'Invalid repository owner format');
    }
    if (!validateRepositoryName(repo)) {
      throw error(400, 'Invalid repository name format');
    }

    // Validate markdown content length to prevent abuse
    if (typeof markdown !== 'string' || markdown.length > 1000000) {
      throw error(400, 'Invalid markdown content or content too large (max 1MB)');
    }

    // Validate optional branch parameter
    const targetBranch = branch ? (validateBranchName(branch) ? branch : undefined) : undefined;
    if (branch && !targetBranch) {
      throw error(400, 'Invalid branch name format');
    }

    const finalBranch = targetBranch || 'main';
    const targetMessage = commitMessage || 'docs: update README.md using README Builder';

    // Track assets upload results
    const assetResults: Array<{ fileName: string; success: boolean; message?: string }> = [];

    // 1. Upload assets if provided
    if (Array.isArray(assets) && assets.length > 0) {
      for (const asset of assets) {
        try {
          const { fileName, base64Content, repositoryPath } = asset as AssetUploadPayload;

          // Get SHA if file exists (for updates)
          let existingAssetSha: string | undefined = undefined;
          try {
            const checkResponse = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/contents/${repositoryPath}?ref=${finalBranch}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/vnd.github+json',
                  'User-Agent': 'README-Builder'
                }
              }
            );
            if (checkResponse.ok) {
              const fileInfo = await checkResponse.json();
              existingAssetSha = fileInfo.sha;
            }
          } catch (checkErr) {
            console.warn(`Could not retrieve existing SHA for ${repositoryPath}:`, checkErr);
          }

          // Upload asset
          const assetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${repositoryPath}`;
          const assetResponse = await fetch(assetUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/vnd.github+json',
              'User-Agent': 'README-Builder'
            },
            body: JSON.stringify({
              message: `docs: add asset ${fileName}`,
              content: base64Content,
              sha: existingAssetSha,
              branch: finalBranch
            })
          });

          if (assetResponse.ok) {
            assetResults.push({ fileName, success: true });
          } else {
            const errData = await assetResponse.json().catch(() => ({}));
            assetResults.push({
              fileName,
              success: false,
              message: `Asset upload failed: ${assetResponse.statusText}`
            });
          }
        } catch (assetErr) {
          console.error(`Error uploading asset:`, assetErr);
          assetResults.push({
            fileName: assets[0]?.fileName || 'unknown',
            success: false,
            message: 'Asset upload error'
          });
        }
      }
    }

    // 2. Fetch current README.md file details to check if it exists and retrieve its SHA
    let existingSha: string | undefined = undefined;
    const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/README.md?ref=${finalBranch}`;

    try {
      const checkResponse = await fetch(contentsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'README-Builder'
        }
      });

      if (checkResponse.ok) {
        const fileInfo = await checkResponse.json();
        existingSha = fileInfo.sha;
      }
    } catch (checkErr) {
      console.warn('Could not retrieve existing README.md SHA (assuming new file):', checkErr);
    }

    // 3. Safely encode the markdown content into UTF-8 Base64 on the server
    const base64Content = Buffer.from(markdown, 'utf-8').toString('base64');

    // 4. Commit (Create or Update) file contents on GitHub
    const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;
    const putResponse = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        'User-Agent': 'README-Builder'
      },
      body: JSON.stringify({
        message: targetMessage,
        content: base64Content,
        sha: existingSha,
        branch: finalBranch
      })
    });

    if (!putResponse.ok) {
      const errBody = await putResponse.json().catch(() => ({}));
      console.error('GitHub API error:', errBody);
      throw error(putResponse.status, 'Failed to commit to GitHub repository');
    }

    const putData = await putResponse.json();
    return json({
      success: true,
      commitSha: putData.commit.sha,
      htmlUrl: putData.content.html_url,
      assets: assetResults,
      assetCount: assetResults.filter(r => r.success).length
    });
  } catch (err: unknown) {
    console.error('Commit operations failed:', err);
    const errorMessage = getErrorMessage(err);
    console.error('Error details:', errorMessage);
    throw error(500, 'Failed to complete commit operations on GitHub');
  }
};
