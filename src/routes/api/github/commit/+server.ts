import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateGitHubHandle, validateRepositoryName, validateBranchName, getErrorMessage } from '$lib/utils/validation';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = cookies.get('github_token');
  if (!token) {
    throw error(401, 'Unauthorized: Please connect your GitHub account first');
  }

  try {
    const { owner, repo, markdown, commitMessage, branch } = await request.json();

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
    const targetMessage = commitMessage || 'docs: generate README.md using README Builder';

    // 1. Fetch current README.md file details to check if it exists and retrieve its SHA
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

    // 2. Safely encode the markdown content into UTF-8 Base64 on the server
    const base64Content = Buffer.from(markdown, 'utf-8').toString('base64');

    // 3. Commit (Create or Update) file contents on GitHub
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
      htmlUrl: putData.content.html_url
    });
  } catch (err: unknown) {
    console.error('Commit operations failed:', err);
    const errorMessage = getErrorMessage(err);
    console.error('Error details:', errorMessage);
    throw error(500, 'Failed to complete commit operations on GitHub');
  }
};
