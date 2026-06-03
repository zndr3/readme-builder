# README Asset Management System - Implementation Guide

## Overview

A complete README Asset Management System has been implemented for the README Builder application. This system allows users to upload screenshots, GIFs, and other visual assets that are automatically committed to GitHub repositories in the `.github/assets/` directory.

## Architecture

### 1. **Asset Store** (`src/lib/stores/assets.ts`)
Manages the lifecycle of uploaded assets during editing:

```typescript
interface UploadedAsset {
  id: string;                    // Unique identifier
  fileName: string;              // Original filename
  file: File;                    // File object for upload
  previewUrl: string;            // Blob URL for live preview
  repositoryPath: string;        // .github/assets/filename
  size: number;                  // File size in bytes
  type: 'image' | 'gif' | 'video'; // Asset type
  uploadedAt: number;            // Timestamp
}
```

**Functions:**
- `add(asset)` - Add asset to store
- `remove(id)` - Remove asset and clean up blob URLs
- `clear()` - Clear all assets
- `updateRepositoryPath(id, path)` - Update path after collision handling
- `getAll()` - Get all assets

### 2. **Asset Validation** (`src/lib/utils/asset-validation.ts`)

**Supported Formats:**
- PNG, JPG, JPEG, GIF, WebP

**Size Limits:**
- Images: 5 MB
- GIFs: 15 MB
- Warnings: > 3 MB

**Functions:**
- `validateAssetFile(file)` - Comprehensive validation
- `sanitizeFileName(fileName)` - Safe filename generation
- `generateRepositoryPath(fileName)` - Create .github/assets/ paths
- `handleFileNameCollision(fileName, existing)` - Automatic renaming

### 3. **GitHub Asset Service** (`src/lib/github/assets.ts`)

Handles uploading assets to GitHub repositories:

**Functions:**
- `uploadAsset(file, options)` - Upload single asset
- `uploadAssets(files, options)` - Upload multiple assets
- `generateImageMarkdown(alt, path, caption)` - Create markdown syntax

**Features:**
- Automatic filename collision detection
- Base64 encoding
- SHA-based file updates
- Batch uploads with rate limiting

### 4. **ImageUploader Component** (`src/lib/components/ImageUploader.svelte`)

Enhanced upload interface:

**Features:**
- Drag & drop support
- File validation with error/warning UI
- Asset gallery with preview thumbnails
- Image removal with blob URL cleanup
- Markdown syntax preview
- Repository structure visualization

**Workflow:**
```
Upload File
    ↓
Validate (format, size, name)
    ↓
Create blob URL for preview
    ↓
Add to asset store
    ↓
Inject into screenshots widget
    ↓
Display in gallery
    ↓
Generate markdown
```

### 5. **CommitPanel Component** (`src/lib/components/CommitPanel.svelte`)

Enhanced commit interface:

**Features:**
- Asset list display
- Upload progress tracking
- Conversion of File objects to Base64
- Asset upload results summary
- Integration with README commit

**Functions:**
- `fileToBase64(file)` - Convert File to Base64
- `prepareAssets()` - Prepare assets for upload
- `handleCommit()` - Combined README + assets commit

### 6. **Commit Endpoint** (`src/routes/api/github/commit/+server.ts`)

Updated to handle asset uploads:

**Request payload:**
```json
{
  "owner": "username",
  "repo": "repo-name",
  "branch": "main",
  "markdown": "# Content",
  "commitMessage": "docs: ...",
  "assets": [
    {
      "fileName": "dashboard.png",
      "repositoryPath": ".github/assets/dashboard.png",
      "base64Content": "iVBORw0KGgo..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "commitSha": "abc123...",
  "htmlUrl": "https://github.com/...",
  "assets": [
    { "fileName": "dashboard.png", "success": true }
  ],
  "assetCount": 1
}
```

## Data Flow

### During Editing:
```
User uploads image
    ↓
ImageUploader validates file
    ↓
Validates format, size, name
    ↓
Creates blob URL (preview)
    ↓
Generates .github/assets/filename path
    ↓
Stores in asset store
    ↓
Injects into screenshots widget
    ↓
Updates markdown (with repository path, not blob URL)
    ↓
Live preview renders blob URL
    ↓
Final export uses repository path
```

### During Commit:
```
User clicks "Commit to GitHub"
    ↓
CommitPanel gets assets from store
    ↓
Converts File objects to Base64
    ↓
Sends to /api/github/commit with markdown
    ↓
Server uploads assets to .github/assets/
    ↓
Server commits README.md
    ↓
Returns success with asset summary
    ↓
User sees confirmation with asset list
```

## Key Features

### 1. **Smart Asset Storage**
- Blob URLs for instant preview (client-side)
- Repository paths for final markdown
- Complete separation of preview and export

### 2. **File Validation**
- Format checking (5 supported formats)
- Size validation with warnings
- Name validation for GitHub compatibility
- User-friendly error messages

### 3. **Collision Handling**
- Automatic detection of existing files
- Intelligent renaming: `dashboard.png` → `dashboard-1.png`
- Works up to 100 iterations

### 4. **User Experience**
- Drag & drop interface
- Real-time validation feedback
- Asset gallery with thumbnails
- File removal with cleanup
- Upload progress tracking
- Success confirmation

### 5. **GitHub Integration**
- Automatic `.github/assets/` folder creation
- Base64 file encoding
- SHA-based updates
- Commit tracking
- HTML URL generation

## Default Configuration

```typescript
export const SUPPORTED_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024,    // 5 MB
  gif: 15 * 1024 * 1024       // 15 MB
};

const DEFAULT_ASSET_DIR = '.github/assets';
```

## Error Handling

### Validation Errors:
- ✗ Unsupported file format
- ✗ File size exceeds limit
- ✗ Invalid filename for GitHub

### Upload Errors:
- ✗ GitHub API errors
- ✗ Network errors
- ✗ File encoding errors

### Recovery:
- Retry button available
- Clear error messages
- Asset store preserved

## Example Usage

### 1. Upload Screenshot:
```
1. Click "Drag & Drop" area or use file browser
2. Select image (PNG, JPG, GIF, WebP)
3. Image validates and displays in gallery
4. Markdown generates: ![Screenshot](.github/assets/screenshot.png)
```

### 2. Commit to GitHub:
```
1. Click "Commit to GitHub"
2. Review assets and markdown
3. Click "Commit to GitHub"
4. System uploads assets and README
5. See success confirmation
```

## Asset Store Structure

The asset store in screenshots widget now includes:

```typescript
{
  id: "abc123",                           // Link to asset store
  url: ".github/assets/dashboard.png",   // Repository path (markdown)
  alt: "Dashboard",                       // Alt text
  caption: "Dashboard view",              // Optional caption
  previewUrl: "blob:http://...",         // Blob URL (preview)
  fileName: "dashboard.png",              // Sanitized name
  repositoryPath: ".github/assets/..."   // Full path
}
```

## Integration Points

1. **ImageUploader** imports from `asset-validation.ts`
2. **ImageUploader** uses `assets` store
3. **CommitPanel** subscribes to `assets` store
4. **Commit endpoint** processes asset array
5. **Markdown generator** uses `url` field (repository path)

## Testing Checklist

- [ ] Upload image via drag & drop
- [ ] Upload image via file picker
- [ ] Validate file format errors
- [ ] Validate file size warnings
- [ ] Upload multiple images
- [ ] Remove image from gallery
- [ ] View markdown preview
- [ ] Commit to GitHub
- [ ] Verify assets in `.github/assets/` folder
- [ ] Verify markdown uses correct paths
- [ ] Test filename collision handling
- [ ] Test with GIF files (15 MB limit)

## Future Enhancements

Designed for future expansion:

- **Compression**: Add optional image optimization
- **Drag reordering**: Reorder images in gallery
- **Bulk upload**: Upload multiple files at once
- **Video support**: Upload .webm and .mp4 files
- **Asset folders**: Organize assets in subfolders
- **Asset manager**: Dedicated asset management sidebar
- **Duplicate detection**: Detect duplicate uploads
- **CDN integration**: Upload to external CDN
- **Batch optimization**: Compress on client before upload
- **Asset replacement**: Replace existing assets without renaming

## Troubleshooting

### Assets not appearing in markdown:
- Ensure images are in the screenshots widget
- Check `url` field contains repository path, not blob URL

### Upload fails to GitHub:
- Verify GitHub token is valid
- Check repository permissions
- Ensure branch exists
- Check file size limits

### Blob URLs not displaying:
- Verify images are added to asset store
- Check `previewUrl` field is blob URL
- Ensure image component reads `previewUrl` prop

## Code Examples

### Adding asset programmatically:
```typescript
import { assets } from '$lib/stores/assets';

assets.add({
  id: generateId(),
  fileName: 'screenshot.png',
  file: imageFile,
  previewUrl: URL.createObjectURL(imageFile),
  repositoryPath: '.github/assets/screenshot.png',
  size: imageFile.size,
  type: 'image',
  uploadedAt: Date.now()
});
```

### Validating before upload:
```typescript
import { validateAssetFile } from '$lib/utils/asset-validation';

const validation = validateAssetFile(file);
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}
if (validation.warnings.length > 0) {
  console.warn('Warnings:', validation.warnings);
}
```

### Generating repository path:
```typescript
import { generateRepositoryPath, sanitizeFileName } from '$lib/utils/asset-validation';

const sanitized = sanitizeFileName('My Screenshot.png');
const path = generateRepositoryPath(sanitized);
// Result: .github/assets/my-screenshot.png
```

## Summary

The README Asset Management System provides a seamless, user-friendly way to manage visual assets in README files. Assets are:

- ✅ Validated for format and size
- ✅ Stored securely in `.github/assets/`
- ✅ Previewed instantly with blob URLs
- ✅ Included in GitHub commits
- ✅ Referenced with correct repository paths
- ✅ Automatically collision-detected and renamed

Zero manual asset management required.
