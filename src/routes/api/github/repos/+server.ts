import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getErrorMessage } from '$lib/utils/validation';

export const GET: RequestHandler = async ({ cookies }) => {
  const token = cookies.get('github_token');
  if (!token) {
    throw error(401, 'Unauthorized: Please connect your GitHub account');
  }

  try {
    // Fetch all repositories where the authenticated user is an owner, sorted by recent updates
    const reposResponse = await fetch(
      'https://api.github.com/user/repos?per_page=100&type=owner&sort=updated',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'README-Builder'
        }
      }
    );

    if (!reposResponse.ok) {
      throw error(reposResponse.status, 'Failed to fetch repositories from GitHub');
    }

    const repos = await reposResponse.json();
    
    // Map GitHub API response into standard UI repository cards model
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
      private: repo.private,
      description: repo.description || 'No description provided.',
      language: repo.language || 'Other',
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      defaultBranch: repo.default_branch || 'main'
    }));

    return json(formattedRepos);
  } catch (err: unknown) {
    console.error('Failed to proxy repositories from GitHub:', err);
    const errorMessage = getErrorMessage(err);
    console.error('Error details:', errorMessage);
    throw error(500, 'Failed to fetch repositories from GitHub');
  }
};
