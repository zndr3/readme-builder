import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  // Clear the GitHub token cookie
  cookies.delete('github_token', { path: '/' });
  
  throw redirect(302, '/');
};
