<script lang="ts">
  import { createSection, generateId, type READMESection } from '../utils/sections';
  import { assets } from '../stores/assets';
  import { validateAssetFile, generateRepositoryPath, sanitizeFileName, getFileExtension } from '../utils/asset-validation';
  import { Image, Upload, AlertCircle, FileCode, Check, AlertTriangle, Trash2 } from 'lucide-svelte';

  // Svelte 5 props
  let { sections = $bindable() } = $props<{ sections: READMESection[] }>();

  // State
  let isDragging = $state(false);
  let justUploaded = $state(false);
  let uploadedFileName = $state('');
  let validationErrors = $state<string[]>([]);
  let validationWarnings = $state<string[]>([]);
  let showValidationUI = $state(false);

  // Checks if screenshots widget is present and has active images
  const hasScreenshots = $derived.by(() => {
    const sec = sections.find((s: READMESection) => s.type === 'screenshots');
    return sec && sec.content.images && sec.content.images.length > 0;
  });

  // Automatically fetch the active screenshots list
  const activeScreenshots = $derived.by(() => {
    const sec = sections.find((s: READMESection) => s.type === 'screenshots');
    return sec ? sec.content.images : [];
  });

  /**
   * Injects an image into the 'screenshots' README widget
   * Stores file in asset store and adds preview to widget
   */
  function injectImageToReadme(file: File, previewUrl: string, sanitizedName: string, repositoryPath: string) {
    let screenshotSec = sections.find((s: READMESection) => s.type === 'screenshots');
    
    // Create section if absent
    if (!screenshotSec) {
      screenshotSec = createSection('screenshots');
      screenshotSec.content.images = [];
      
      // Smart injection position
      const titleIndex = sections.findIndex((s: READMESection) => s.type === 'title');
      const descIndex = sections.findIndex((s: READMESection) => s.type === 'description');
      const insertAt = Math.max(0, titleIndex, descIndex) + 1;
      sections.splice(insertAt, 0, screenshotSec);
    }

    // Generate unique alt text from filename
    const baseName = sanitizedName.split('.')[0];
    const altText = baseName
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Screenshot';

    // Add image to screenshots widget with asset tracking
    const imageId = generateId();
    screenshotSec.content.images.push({
      id: imageId, // Link to asset store
      url: repositoryPath, // Final markdown URL
      alt: altText,
      caption: '',
      previewUrl, // Blob URL for live preview
      fileName: sanitizedName,
      repositoryPath // Store path info
    });

    // Add to asset store
    assets.add({
      id: imageId,
      fileName: sanitizedName,
      file,
      previewUrl,
      repositoryPath,
      size: file.size,
      type: getFileExtension(sanitizedName) === 'gif' ? 'gif' : 'image',
      uploadedAt: Date.now()
    });

    sections = [...sections]; // Trigger reactivity update
  }

  /**
   * Validate and process file upload
   */
  function handleFiles(files: FileList) {
    validationErrors = [];
    validationWarnings = [];
    showValidationUI = false;

    if (files.length === 0) return;

    const file = files[0];

    // Validate file
    const validation = validateAssetFile(file);
    
    if (!validation.valid) {
      validationErrors = validation.errors;
      validationWarnings = validation.warnings;
      showValidationUI = true;
      return;
    }

    if (validation.warnings.length > 0) {
      validationWarnings = validation.warnings;
      showValidationUI = true;
    }

    // Process file
    uploadedFileName = file.name;
    const sanitized = sanitizeFileName(file.name);
    const repositoryPath = generateRepositoryPath(sanitized);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Inject into README
    injectImageToReadme(file, previewUrl, sanitized, repositoryPath);

    justUploaded = true;
    setTimeout(() => justUploaded = false, 4000);
  }

  /**
   * Remove an image from the screenshots widget and asset store
   */
  function removeImage(imageId: string) {
    let screenshotSec = sections.find((s: READMESection) => s.type === 'screenshots');
    if (!screenshotSec) return;

    screenshotSec.content.images = screenshotSec.content.images.filter((img: any) => img.id !== imageId);
    
    // Clean up asset store
    assets.remove(imageId);

    sections = [...sections];
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function onDragLeave() {
    isDragging = false;
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      handleFiles(input.files);
    }
  }

  function dismissValidation() {
    showValidationUI = false;
  }
</script>

<div class="space-y-4">
  <!-- Validation Errors / Warnings Alert -->
  {#if showValidationUI && (validationErrors.length > 0 || validationWarnings.length > 0)}
    <div class="bg-slate-950 border rounded-xl p-4 space-y-2 {validationErrors.length > 0 ? 'border-red-500/30' : 'border-amber-500/30'}">
      {#if validationErrors.length > 0}
        <div class="flex items-start space-x-2">
          <AlertTriangle class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 class="text-xs font-bold text-red-400">Upload Failed</h4>
            <ul class="text-[11px] text-red-300 mt-1 space-y-0.5">
              {#each validationErrors as error}
                <li>• {error}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}
      
      {#if validationWarnings.length > 0}
        <div class="flex items-start space-x-2 pt-2 border-t border-slate-800" class:pt-0={validationErrors.length === 0} class:border-t-0={validationErrors.length === 0}>
          <AlertCircle class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 class="text-xs font-bold text-amber-400">Warnings</h4>
            <ul class="text-[11px] text-amber-300 mt-1 space-y-0.5">
              {#each validationWarnings as warning}
                <li>• {warning}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}

      <button
        onclick={dismissValidation}
        class="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-medium transition"
      >
        Dismiss
      </button>
    </div>
  {/if}

  <!-- Dotted Drop Zone -->
  <div class="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition duration-300 relative overflow-hidden group {isDragging ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700/80 hover:bg-slate-950/60'}" ondragover={onDragOver} ondragleave={onDragLeave} ondrop={onDrop}>
    <!-- File Input click trigger -->
    <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" onchange={onFileSelect} />
    
    {#if justUploaded}
      <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
        <Check class="w-5 h-5" />
      </div>
      <h4 class="text-xs font-bold text-white">Asset Ready for Commit</h4>
      <p class="text-[11px] text-slate-400 mt-1">
        File stored: <code class="text-emerald-400 font-mono text-[10px]">.github/assets/{uploadedFileName}</code>
      </p>
    {:else}
      <div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 group-hover:bg-indigo-500/20 transition">
        <Upload class="w-5 h-5" />
      </div>
      <h4 class="text-xs font-bold text-slate-200">Drag & Drop screenshot or image here</h4>
      <p class="text-[11px] text-slate-500 mt-1">PNG, JPG, GIF, WebP. Max 5MB (GIF: 15MB).</p>
      <span class="text-[10px] text-indigo-400 font-semibold mt-2.5 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40">Browse Files</span>
    {/if}
  </div>

  <!-- Asset Gallery (visible when screenshots are added) -->
  {#if hasScreenshots && activeScreenshots.length > 0}
    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
      <h4 class="text-xs font-bold text-slate-200">📸 Assets in This README ({activeScreenshots.length})</h4>
      
      <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
        {#each activeScreenshots as image}
          <div class="flex items-center space-x-2 p-2 bg-slate-900/50 rounded border border-slate-800/80 text-xs">
            <div class="w-12 h-12 rounded bg-slate-800 shrink-0 overflow-hidden">
              {#if image.previewUrl}
                <img src={image.previewUrl} alt={image.alt} class="w-full h-full object-cover" />
              {:else}
                <div class="w-full h-full flex items-center justify-center text-slate-600">
                  <Image class="w-4 h-4" />
                </div>
              {/if}
            </div>
            
            <div class="flex-1 min-w-0">
              <p class="text-slate-200 font-medium truncate">{image.fileName}</p>
              <p class="text-slate-500 text-[10px] font-mono truncate">{image.repositoryPath}</p>
            </div>
            
            <button
              onclick={() => removeImage(image.id)}
              class="p-1.5 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition shrink-0"
              title="Remove image"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Repository Guidelines -->
  {#if hasScreenshots}
    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
      <div class="flex items-start space-x-2">
        <AlertCircle class="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <h4 class="text-xs font-bold text-slate-200">Commit Workflow</h4>
          <p class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            When you click "Commit README", all assets will be automatically uploaded to <code class="text-indigo-300 font-mono">.github/assets/</code> in your repository.
          </p>
        </div>
      </div>

      <!-- Final Markdown Preview -->
      <div class="relative bg-slate-900 rounded-lg p-3 border border-slate-850 space-y-2">
        <span class="absolute top-2.5 right-2.5 text-[9px] text-slate-500 font-mono">final-markdown</span>
        <p class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Generated Markdown:</p>
        <div class="space-y-1">
          {#each activeScreenshots as image}
            <code class="block p-1.5 bg-slate-950 rounded border border-slate-800 font-mono text-[10px] text-indigo-300 select-all">
              ![{image.alt}]({image.repositoryPath})
            </code>
          {/each}
        </div>
      </div>

      <!-- Folder Structure Info -->
      <div class="relative bg-slate-900 rounded-lg p-3 border border-slate-850">
        <span class="absolute top-2.5 right-2.5 text-[9px] text-slate-500 font-mono">repo-structure</span>
        <pre class="text-[11px] font-mono text-emerald-300 leading-normal select-all">
your-repo/
├── .github/
│   └── assets/          ← Auto-created
│       {#if activeScreenshots.length > 0}
│       ├── {activeScreenshots[0].fileName}{#if activeScreenshots.length > 1}
│       ├── {activeScreenshots[1].fileName}{/if}
│       {/if}
│       └── ...
├── src/
├── package.json
└── README.md</pre>
      </div>
    </div>
  {/if}
</div>
