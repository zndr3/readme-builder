import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_CLIENT_ID } from '$env/static/private';

export const GET: RequestHandler = async ({ url, cookies }) => {
  // Generate CSRF state token for OAuth security
  const state = crypto.getRandomValues(new Uint8Array(32));
  const stateString = Array.from(state)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Store state in secure httpOnly cookie for validation on callback
  cookies.set('oauth_state', stateString, {
    path: '/',
    httpOnly: true,
    secure: url.protocol === 'https:',
    sameSite: 'strict',
    maxAge: 60 * 10 // 10 minute expiry
  });

  // Generate the callback redirect URI based on the request host (works on localhost & production)
  const redirectUri = `${url.origin}/auth/github/callback`;
  
  // Build GitHub OAuth Authorize url with read:user and repo scopes and CSRF state
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read:user%20repo&state=${stateString}`;

  throw redirect(302, authUrl);
};
