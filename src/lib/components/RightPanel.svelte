<script lang="ts">
  import { marked } from 'marked';
  import { FileText, Eye, Code, Copy, Download, Check, AlertCircle } from 'lucide-svelte';

  // Svelte 5 props
  let { 
    markdown = $bindable(), 
    onRawChange 
  } = $props<{ 
    markdown: string; 
    onRawChange: (text: string) => void;
  }>();

  // Tab view: 'preview' | 'editor'
  let rightTab = $state<'preview' | 'editor'>('preview');

  // Copy-to-clipboard state
  let copied = $state(false);

  // Compile raw Markdown into HTML using the marked library.
  // Using Svelte 5 reactive derived variables ($derived) for instant, low-overhead sync.
  const renderedHtml = $derived.by(() => {
    if (!markdown) return '<p class="text-slate-500 italic">No content generated yet.</p>';
    try {
      // Set marked options for GitHub compatibility (breaks lines on single newline, parses raw HTML)
      marked.setOptions({
        gfm: true,
        breaks: true
      });
      return marked.parse(markdown) as string;
    } catch (e) {
      return `<div class="text-red-400 p-4 border border-red-900 bg-red-950/20 rounded">
        <h4 class="font-bold flex items-center"><AlertCircle class="w-4 h-4 mr-1.5" /> Markdown Rendering Error</h4>
        <p class="text-xs mt-1 font-mono">${(e as Error).message}</p>
      </div>`;
    }
  });

  // Calculate list of line numbers for VSCode editor gutter
  const lineNumbers = $derived.by(() => {
    const lines = markdown.split('\n');
    return lines.length > 0 ? lines.length : 1;
  });

  // Handle direct textarea inputs
  function handleTextareaInput(e: Event) {
    const text = (e.target as HTMLTextAreaElement).value;
    markdown = text;
    onRawChange(text); // Notify parent layout to sync Svelte forms state
  }

  // Copy Markdown to Clipboard
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(markdown);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  // Exporter to local file README.md download
  function downloadReadme() {
    try {
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'README.md');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed: ', e);
    }
  }
</script>

<div class="h-full flex flex-col bg-slate-950/40">
  <!-- Right Panel Toolbar Header -->
  <div class="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 p-2 shrink-0 select-none">
    <!-- View Switcher Tabs -->
    <div class="flex space-x-1 p-0.5 bg-slate-900 rounded-lg border border-slate-850">
      <button class="px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center space-x-1.5 {rightTab === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}" onclick={() => rightTab = 'preview'}>
        <Eye class="w-3.5 h-3.5" />
        <span>GitHub Preview</span>
      </button>
      <button class="px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center space-x-1.5 {rightTab === 'editor' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}" onclick={() => rightTab = 'editor'}>
        <Code class="w-3.5 h-3.5" />
        <span>Raw MD Editor</span>
      </button>
    </div>

    <!-- Right Quick Actions -->
    <div class="flex items-center space-x-1.5">
      <button class="py-1.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5" onclick={copyToClipboard} title="Copy Markdown code">
        {#if copied}
          <Check class="w-3.5 h-3.5 text-emerald-400" />
          <span class="text-emerald-400">Copied!</span>
        {:else}
          <Copy class="w-3.5 h-3.5" />
          <span>Copy</span>
        {/if}
      </button>
      
      <button class="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-md" onclick={downloadReadme} title="Export README.md file">
        <Download class="w-3.5 h-3.5" />
        <span>Export MD</span>
      </button>
    </div>
  </div>

  <!-- Real-time sync output content area -->
  <div class="flex-1 overflow-auto min-h-0 bg-[#0d1117]">
    <!-- RENDERED GITHUB LAYOUT -->
    {#if rightTab === 'preview'}
      <div class="markdown-body select-text p-6 md:p-8 max-w-4xl mx-auto">
        <!-- Render parsed Markdown inside Svelte safely using @html directive -->
        {@html renderedHtml}
      </div>

    <!-- RAW CODE EDITOR TAB -->
    {:else}
    {#if rightTab === 'editor'}
      <div class="h-full flex font-mono text-xs text-indigo-100 bg-[#0f1420]">
        <!-- Gutter Gutter Line Numbers -->
        <div class="select-none text-right pr-3 pl-2.5 text-slate-600 bg-slate-950/20 py-6 border-r border-slate-850 shrink-0 min-w-[3.25rem]">
          {#each Array(lineNumbers) as _, idx (idx)}
            <div class="h-5 leading-5">{idx + 1}</div>
          {/each}
        </div>

        <!-- Textarea Code Container -->
        <div class="flex-1 relative h-full">
          <textarea 
            class="w-full h-full bg-transparent font-mono text-xs text-indigo-200 p-6 resize-none focus:outline-none focus:ring-0 leading-5 select-text overflow-y-auto whitespace-pre"
            value={markdown}
            oninput={handleTextareaInput}
            placeholder="Type your markdown here... (Changes automatically synchronize back to the widget inputs)"
            spellcheck="false"
          ></textarea>
        </div>
      </div>
    {/if}
    {/if}
  </div>
</div>
