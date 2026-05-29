<script lang="ts">
  import { X, Sparkles, FileDiff, Trash2, HelpCircle } from 'lucide-svelte';

  // Props in Svelte 5
  let {
    isOpen = $bindable(false),
    onSelectOption
  } = $props<{
    isOpen: boolean;
    onSelectOption: (option: 'improve' | 'replace' | 'merge') => void;
  }>();

  function selectOption(option: 'improve' | 'replace' | 'merge') {
    onSelectOption(option);
    isOpen = false;
  }
</script>

{#if isOpen}
  <!-- Sliding Glassmorphic Modal Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onclick={() => isOpen = false}>
    
    <!-- Modal Container -->
    <div class="w-full max-w-lg bg-[#0c111e]/95 border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden glass-panel" onclick={(e) => e.stopPropagation()}>
      
      <!-- Modal Header -->
      <div class="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none bg-slate-950/20">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles class="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-white">Existing README.md Detected</h3>
            <p class="text-[10px] text-slate-400 font-medium">Choose how you want to handle the existing README file</p>
          </div>
        </div>
        <button class="p-1.5 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-white transition" onclick={() => isOpen = false}>
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-5 space-y-3.5 select-none">
        
        <!-- Option 1: Improve Existing -->
        <button 
          class="w-full p-4 bg-slate-950/50 hover:bg-slate-900/60 border border-slate-850 hover:border-indigo-500/40 rounded-xl text-left transition duration-200 group flex items-start space-x-3.5"
          onclick={() => selectOption('improve')}
        >
          <div class="w-9 h-9 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition duration-200">
            <Sparkles class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">Improve Existing README (Recommended)</h4>
            <p class="text-[10px] text-slate-400 leading-normal mt-1 pr-4">
              We'll parse your existing README.md into draggable visual widgets and enrich it with our scanned tech stack, setup commands, and metadata.
            </p>
          </div>
        </button>

        <!-- Option 2: Merge -->
        <button 
          class="w-full p-4 bg-slate-950/50 hover:bg-slate-900/60 border border-slate-850 hover:border-emerald-500/40 rounded-xl text-left transition duration-200 group flex items-start space-x-3.5"
          onclick={() => selectOption('merge')}
        >
          <div class="w-9 h-9 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition duration-200">
            <FileDiff class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition">Merge with Scanned Boilers</h4>
            <p class="text-[10px] text-slate-400 leading-normal mt-1 pr-4">
              Keep all your original content exactly as is and append new automatically-scanned modules (e.g. tech stack badges, file tree) at the bottom.
            </p>
          </div>
        </button>

        <!-- Option 3: Replace Completely -->
        <button 
          class="w-full p-4 bg-slate-950/50 hover:bg-slate-900/60 border border-slate-850 hover:border-red-500/40 rounded-xl text-left transition duration-200 group flex items-start space-x-3.5"
          onclick={() => selectOption('replace')}
        >
          <div class="w-9 h-9 rounded-lg bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition duration-200">
            <Trash2 class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-200 group-hover:text-red-400 transition">Replace Completely</h4>
            <p class="text-[10px] text-slate-400 leading-normal mt-1 pr-4">
              Discard your current README.md and auto-generate a brand-new professional documentation draft based entirely on the scanned repository assets.
            </p>
          </div>
        </button>

      </div>
    </div>
  </div>
{/if}
