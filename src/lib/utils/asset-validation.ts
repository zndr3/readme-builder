/**
 * Asset Validation Utility
 * Validates file formats, sizes, and names for README assets
 */

export const SUPPORTED_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
export const SUPPORTED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp'
];

export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5 MB for standard images
  gif: 15 * 1024 * 1024 // 15 MB for GIFs
};

export interface FileValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

/**
 * Determine asset type from file extension
 */
export function getAssetType(fileName: string): 'image' | 'gif' | 'video' {
  const ext = getFileExtension(fileName);
  if (ext === 'gif') return 'gif';
  if (ext === 'webm' || ext === 'mp4') return 'video';
  return 'image';
}

/**
 * Validate file format
 */
function validateFormat(fileName: string): { valid: boolean; error?: string } {
  const ext = getFileExtension(fileName);
  
  if (!ext) {
    return { valid: false, error: 'File has no extension' };
  }
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file format: .${ext}. Supported: ${SUPPORTED_FORMATS.join(', ')}`
    };
  }
  
  return { valid: true };
}

/**
 * Validate file size
 */
function validateFileSize(fileName: string, fileSize: number): { valid: boolean; error?: string; warning?: string } {
  const assetType = getAssetType(fileName);
  const limit = assetType === 'gif' ? FILE_SIZE_LIMITS.gif : FILE_SIZE_LIMITS.image;
  
  if (fileSize > limit) {
    const limitMB = limit / (1024 * 1024);
    const fileMB = (fileSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${fileMB}MB) exceeds limit (${limitMB}MB) for ${assetType} assets`
    };
  }
  
  // Warning for large files (>3MB)
  const warningThreshold = 3 * 1024 * 1024;
  if (fileSize > warningThreshold) {
    const fileMB = (fileSize / (1024 * 1024)).toFixed(1);
    return {
      valid: true,
      warning: `Large file (${fileMB}MB) may slow down repository cloning`
    };
  }
  
  return { valid: true };
}

/**
 * Validate file name for GitHub repository
 */
function validateFileName(fileName: string): { valid: boolean; error?: string } {
  // Remove extension
  const name = fileName.split('.').slice(0, -1).join('.');
  
  // Check for invalid characters in GitHub filenames
  const invalidChars = /[<>:"/\\|?*]/g;
  if (invalidChars.test(name)) {
    return {
      valid: false,
      error: 'File name contains invalid characters: < > : " / \\ | ? *'
    };
  }
  
  // Check length
  if (fileName.length > 255) {
    return {
      valid: false,
      error: 'File name is too long (max 255 characters)'
    };
  }
  
  return { valid: true };
}

/**
 * Comprehensive file validation
 */
export function validateAssetFile(file: File): FileValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate format
  const formatCheck = validateFormat(file.name);
  if (!formatCheck.valid && formatCheck.error) {
    errors.push(formatCheck.error);
  }
  
  // Validate file name
  const nameCheck = validateFileName(file.name);
  if (!nameCheck.valid && nameCheck.error) {
    errors.push(nameCheck.error);
  }
  
  // Validate file size
  const sizeCheck = validateFileSize(file.name, file.size);
  if (!sizeCheck.valid && sizeCheck.error) {
    errors.push(sizeCheck.error);
  } else if (sizeCheck.warning) {
    warnings.push(sizeCheck.warning);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate sanitized file name for repository
 * Removes spaces, converts to lowercase, keeps alphanumeric and hyphens
 */
export function sanitizeFileName(fileName: string): string {
  const ext = getFileExtension(fileName);
  const name = fileName.split('.').slice(0, -1).join('.');
  
  // Convert to lowercase, replace spaces and underscores with hyphens, remove other special chars
  const sanitized = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${sanitized || 'asset'}.${ext}`;
}

/**
 * Generate repository path for asset
 * Default location: .github/assets/
 */
export function generateRepositoryPath(fileName: string, baseDir = '.github/assets'): string {
  const sanitized = sanitizeFileName(fileName);
  return `${baseDir}/${sanitized}`;
}

/**
 * Handle filename collision by appending counter
 * dashboard.png -> dashboard-1.png, dashboard-2.png, etc.
 */
export function handleFileNameCollision(fileName: string, existingFileNames: string[]): string {
  const ext = getFileExtension(fileName);
  const baseName = fileName.split('.').slice(0, -1).join('.');
  
  if (!existingFileNames.includes(fileName)) {
    return fileName;
  }
  
  let counter = 1;
  let newName = `${baseName}-${counter}.${ext}`;
  
  while (existingFileNames.includes(newName) && counter < 100) {
    counter++;
    newName = `${baseName}-${counter}.${ext}`;
  }
  
  return newName;
}
