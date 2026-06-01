import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { getErrorMessage } from '$lib/utils/validation';

export const GET: RequestHandler = async ({ url, cookies }) => {
  try {
    // Validate environment variables are set
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      console.error('GitHub OAuth credentials not configured in .env');
      throw error(500, 'Server configuration error: GitHub credentials missing');
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const githubError = url.searchParams.get('error');

    // Check if GitHub returned an error
    if (githubError) {
      const errorDescription = url.searchParams.get('error_description') || githubError;
      console.error(`GitHub OAuth error: ${errorDescription}`);
      throw error(400, `GitHub authorization failed: ${errorDescription}`);
    }

    if (!code) {
      throw error(400, 'Authorization code missing from query parameters');
    }

    // Validate CSRF state parameter
    const storedState = cookies.get('oauth_state');
    if (!state || !storedState || state !== storedState) {
      throw error(403, 'Invalid CSRF state token - authorization request may have been tampered with');
    }

    // Clear the state cookie after validation
    cookies.delete('oauth_state', { path: '/' });

    const redirectUri = `${url.origin}/auth/github/callback`;
    console.log(`GitHub OAuth callback - Redirect URI: ${redirectUri}`);

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(`GitHub token exchange failed: ${tokenResponse.status} - ${errorText}`);
      throw error(tokenResponse.status, `GitHub token exchange failed (${tokenResponse.status})`);
    }

    const data = await tokenResponse.json();
    if (data.error) {
      console.error(`GitHub OAuth error response: ${data.error} - ${data.error_description || 'no description'}`);
      throw error(400, `GitHub error: ${data.error_description || data.error}`);
    }

    const accessToken = data.access_token;
    if (!accessToken) {
      console.error('GitHub response did not contain access token');
      throw error(400, 'Access token was not returned by GitHub');
    }

    // Set the token inside an httpOnly secure session cookie
    cookies.set('github_token', accessToken, {
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week duration
    });

    console.log('GitHub authentication successful');
    // Redirect the user back to the primary workspace
    throw redirect(302, '/');
  } catch (err: unknown) {
    // Log detailed error server-side
    console.error('Failed to perform GitHub token exchange:', err);
    const errorMessage = getErrorMessage(err);
    console.error('Error details:', errorMessage);
    
    // Re-throw SvelteKit errors as-is, otherwise return generic 500
    if (err && typeof err === 'object' && 'status' in err) {
      throw err;
    }
    throw error(500, 'Authentication failed. Please try again.');
  }
};
