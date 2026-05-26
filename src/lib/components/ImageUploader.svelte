<script lang="ts">
  import { createSection, type READMESection } from '../utils/sections';
  import { Image, Upload, AlertCircle, FileCode, Check } from 'lucide-svelte';

  // Svelte 5 props
  let { sections = $bindable() } = $props<{ sections: READMESection[] }>();

  // Drag over visual state
  let isDragging = $state(false);
  let justUploaded = $state(false);
  let uploadedFileName = $state('');

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

  // Injects an image into the 'screenshots' README widget
  function injectImageToReadme(name: string, dataUrl: string) {
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

    // Append image metadata. The URL path is formatted as `./images/filename` for git repo consistency,
    // but we can preserve the base64 dataUrl inside Svelte state so the Rendered Live Preview actually displays the image!
    // This is a brilliant hybrid approach!
    screenshotSec.content.images.push({
      url: `./images/${name}`,
      alt: name.split('.')[0] || 'Screenshot',
      caption: 'Visual project dashboard showing live operational metrics.',
      previewDataUrl: dataUrl // Keep local preview URL for Svelte rendering
    });

    sections = [...sections]; // Trigger reactivity update
  }

  // Handle files upload
  function handleFiles(files: FileList) {
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        injectImageToReadme(file.name, result);
        justUploaded = true;
        setTimeout(() => justUploaded = false, 4000);
      }
    };
    reader.readAsDataURL(file);
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
</script>

<div class="space-y-4">
  <!-- Dotted Drop Zone -->
  <div class="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition duration-300 relative overflow-hidden group {isDragging ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700/80 hover:bg-slate-950/60'}" ondragover={onDragOver} ondragleave={onDragLeave} ondrop={onDrop}>
    <!-- File Input click trigger -->
    <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" onchange={onFileSelect} />
    
    {#if justUploaded}
      <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
        <Check class="w-5 h-5" />
      </div>
      <h4 class="text-xs font-bold text-white">Screenshot Loaded Successfully!</h4>
      <p class="text-[11px] text-slate-400 mt-1">Simulated relative URL: <code class="text-emerald-400 font-mono text-[10px]">./images/{uploadedFileName}</code></p>
    {:else}
      <div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 group-hover:bg-indigo-500/20 transition">
        <Upload class="w-5 h-5" />
      </div>
      <h4 class="text-xs font-bold text-slate-200">Drag & Drop screenshot or image here</h4>
      <p class="text-[11px] text-slate-500 mt-1">Supports PNG, JPG, GIF, SVG. Max size 5MB.</p>
      <span class="text-[10px] text-indigo-400 font-semibold mt-2.5 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40">Browse Files</span>
    {/if}
  </div>

  <!-- Instruction Block (visible automatically when screenshots are added / active) -->
  {#if hasScreenshots}
    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
      <div class="flex items-start space-x-2">
        <AlertCircle class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 class="text-xs font-bold text-slate-200">Git Repository Guidelines</h4>
          <p class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            GitHub displays screenshots directly from your repository path. To make these image links resolve correctly in production, follow this folder setup:
          </p>
        </div>
      </div>

      <!-- Repo folder layout block -->
      <div class="relative bg-slate-900 rounded-lg p-3 border border-slate-850">
        <span class="absolute top-2.5 right-2.5 text-[9px] text-slate-500 font-mono flex items-center">
          <FileCode class="w-3 h-3 mr-1 text-slate-600" /> project-layout
        </span>
        <pre class="text-[11px] font-mono text-indigo-300 leading-normal select-all">
project-root/
├── images/
│   ├── {uploadedFileName || 'preview.png'}
│   └── demo.gif
├── src/
├── package.json
└── README.md</pre>
      </div>

      <!-- Syntax preview -->
      <div class="text-[11px] text-slate-400">
        Generated Markdown Syntax:
        <code class="block mt-1 p-1.5 bg-slate-900 rounded border border-slate-850 font-mono text-[10px] text-indigo-400 select-all">
          ![Preview](./images/{uploadedFileName || 'preview.png'})
        </code>
      </div>
    </div>
  {/if}
</div>
