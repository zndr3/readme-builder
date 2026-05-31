import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const token = cookies.get('github_token');
  if (!token) {
    return { user: null };
  }

  try {
    // Fetch authenticated user profile details from GitHub API
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'README-Builder'
      }
    });

    if (userResponse.ok) {
      const user = await userResponse.json();
      return {
        user: {
          login: user.login,
          name: user.name || user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url
        }
      };
    } else {
      // If unauthorized (e.g. token expired/revoked), delete the cached cookie
      if (userResponse.status === 401) {
        cookies.delete('github_token', { path: '/' });
      }
      return { user: null };
    }
  } catch (e) {
    console.error('Failed to fetch user session from GitHub API:', e);
    return { user: null };
  }
};
