import { writable, derived } from 'svelte/store';

export interface UploadedAsset {
  id: string;
  fileName: string;
  file: File;
  previewUrl: string; // blob: URL for immediate preview
  repositoryPath: string; // .github/assets/filename
  size: number; // bytes
  type: 'image' | 'gif' | 'video'; // file type category
  uploadedAt: number; // timestamp
}

export interface AssetMetadata {
  totalSize: number;
  fileCount: number;
  assets: UploadedAsset[];
}

/**
 * Asset Store: Manages all uploaded README assets during editing session
 * 
 * Responsibilities:
 * - Store File objects and preview URLs
 * - Track repository paths (.github/assets/filename)
 * - Manage asset metadata
 * - Persist assets throughout edit session
 */

function createAssetStore() {
  const { subscribe, update } = writable<UploadedAsset[]>([]);

  return {
    subscribe,
    
    /**
     * Add a new asset to the store
     */
    add: (asset: UploadedAsset) => {
      update(assets => [...assets, asset]);
    },

    /**
     * Remove an asset by ID
     */
    remove: (id: string) => {
      update(assets => {
        const asset = assets.find(a => a.id === id);
        if (asset?.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(asset.previewUrl);
        }
        return assets.filter(a => a.id !== id);
      });
    },

    /**
     * Remove all assets and clean up blob URLs
     */
    clear: () => {
      update(assets => {
        assets.forEach(asset => {
          if (asset.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(asset.previewUrl);
          }
        });
        return [];
      });
    },

    /**
     * Update an asset's repository path (after collision handling)
     */
    updateRepositoryPath: (id: string, newPath: string) => {
      update(assets =>
        assets.map(a => (a.id === id ? { ...a, repositoryPath: newPath } : a))
      );
    },

    /**
     * Get all assets as array
     */
    getAll: (): Promise<UploadedAsset[]> => {
      return new Promise(resolve => {
        const unsubscribe = subscribe(assets => {
          resolve(assets);
          unsubscribe();
        });
      });
    }
  };
}

export const assets = createAssetStore();

/**
 * Derived store: Calculate total assets metadata
 */
export const assetMetadata = derived(assets, ($assets) => {
  const totalSize = $assets.reduce((sum, asset) => sum + asset.size, 0);
  return {
    totalSize,
    fileCount: $assets.length,
    assets: $assets
  } as AssetMetadata;
});

/**
 * Derived store: Get all assets ready for commit (with file data)
 */
export const assetsForCommit = derived(assets, ($assets) => {
  return $assets.map(asset => ({
    fileName: asset.fileName,
    repositoryPath: asset.repositoryPath,
    file: asset.file,
    size: asset.size
  }));
});
