/**
 * Input validation utilities for security
 */

/**
 * Validates GitHub repository owner/username format
 * Matches GitHub username rules: alphanumeric and hyphens, 1-39 chars
 */
export function validateGitHubHandle(handle: string | null): boolean {
  if (!handle || typeof handle !== 'string') return false;
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/.test(handle);
}

/**
 * Validates GitHub repository name format
 * Matches GitHub repo name rules: alphanumeric, hyphens, underscores, dots, 1-255 chars
 */
export function validateRepositoryName(repo: string | null): boolean {
  if (!repo || typeof repo !== 'string') return false;
  return /^[a-zA-Z0-9._-]{1,255}$/.test(repo);
}

/**
 * Validates branch name format
 * Prevents special characters and path traversal
 */
export function validateBranchName(branch: string | null): boolean {
  if (!branch || typeof branch !== 'string') return false;
  return /^[a-zA-Z0-9._\-/]{1,255}$/.test(branch) && !branch.includes('..') && !branch.startsWith('/');
}

/**
 * Type guard for error handling
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}
