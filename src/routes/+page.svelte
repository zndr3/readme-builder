<script lang="ts">
  import { onMount } from 'svelte';
  import { templatePresets } from '$lib/utils/presets';
  import { createSection, type READMESection, defaultSectionContent } from '$lib/utils/sections';
  import { compileMarkdown, parseMarkdown } from '$lib/utils/markdown-generator';
  import LeftPanel from '$lib/components/LeftPanel.svelte';
  import RightPanel from '$lib/components/RightPanel.svelte';
  import { 
    Layers, Briefcase, Package, Smartphone, Cpu, Zap, Settings, 
    Gamepad, ChevronDown, Trash2, RotateCcw, AlertTriangle, FileCode, CheckCircle2
  } from 'lucide-svelte';

  // Global Reactive States in Svelte 5
  let sections = $state<READMESection[]>([]);
  let markdown = $state<string>('');
  let isEditingRaw = $state(false);

  // Preset Selector Dropdown visual state
  let showPresetsDropdown = $state(false);
  let activePresetName = $state('Fullstack App');

  // Trigger compiler sync: whenever sections array properties change, compile to raw markdown
  // Svelte 5 $effect automatically tracks deep dependencies in the sections array!
  $effect(() => {
    if (!isEditingRaw) {
      markdown = compileMarkdown(sections);
    }
  });

  // Handle Bidirectional Raw Text Editor Input
  function handleRawMarkdownChange(text: string) {
    isEditingRaw = true;
    markdown = text;
    
    // Parse raw markdown text back into Svelte widgets list
    const parsed = parseMarkdown(text);
    if (parsed && parsed.length > 0) {
      sections = parsed;
    }
  }

  // Load a Predefined Preset Template
  function loadPreset(key: string) {
    const preset = templatePresets[key];
    if (preset) {
      // Deep clone template widgets array to prevent binding mutations
      sections = JSON.parse(JSON.stringify(preset.sections));
      activePresetName = preset.name;
      isEditingRaw = false; // Reset raw edit lock to force fresh compile
      showPresetsDropdown = false;
    }
  }

  // Reset workspace to basic title / description boilerplates
  function resetToDefault() {
    sections = [
      createSection('title'),
      createSection('description'),
      createSection('tech-stack'),
      createSection('installation')
    ];
    activePresetName = 'Custom README';
    isEditingRaw = false;
  }

  // Clear workspace empty
  function clearAll() {
    sections = [];
    activePresetName = 'Blank';
    markdown = '';
    isEditingRaw = false;
  }

  // Bootstrapping: load "Fullstack App" template as default starter layout
  onMount(() => {
    loadPreset('fullstack');
  });

  // Helper matching preset keys to icons
  function getPresetIcon(key: string) {
    switch (key) {
      case 'fullstack': return Layers;
      case 'portfolio': return Briefcase;
      case 'pkg': return Package;
      case 'mobile': return Smartphone;
      case 'ml': return Cpu;
      case 'hackathon': return Zap;
      case 'api': return Settings;
      case 'game': return Gamepad;
      default: return Layers;
    }
  }
</script>

<!-- SEO Header title -->
<svelte:head>
  <title>GitHub README Builder — Drag & Drop Visual Editor</title>
</svelte:head>

<div class="h-screen w-screen flex flex-col overflow-hidden bg-[#070b14] text-slate-100 font-sans">
  
  <!-- Premium Nav Header -->
  <header class="h-16 bg-[#0c111e]/90 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between shrink-0 select-none glass-panel z-10 shadow-lg">
    <!-- Brand Title -->
    <div class="flex items-center space-x-2.5">
      <div class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
        <Zap class="w-5 h-5 fill-white/10" />
      </div>
      <div>
        <h1 class="text-sm md:text-base font-extrabold tracking-tight text-white flex items-center">
          GitHub README Builder
          <span class="ml-2 px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-900/50 text-[10px] font-bold text-indigo-400">Beta</span>
        </h1>
        <p class="text-[10px] text-slate-500 font-medium">Build professional documentations in real-time</p>
      </div>
    </div>

    <!-- Active Template Preset dropdown -->
    <div class="flex items-center space-x-3">
      <div class="relative">
        <button class="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-bold text-slate-200 hover:text-white flex items-center space-x-2 transition shadow-sm" onclick={() => showPresetsDropdown = !showPresetsDropdown}>
          <span class="text-slate-400">Template:</span>
          <span class="text-indigo-400">{activePresetName}</span>
          <ChevronDown class="w-3.5 h-3.5 text-slate-500" />
        </button>

        {#if showPresetsDropdown}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="fixed inset-0 z-40" onclick={() => showPresetsDropdown = false}></div>
          <div class="absolute right-0 mt-2 w-72 bg-slate-950 border border-slate-850 rounded-xl shadow-2xl p-2.5 z-50">
            <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1 mb-1 border-b border-slate-900">Choose Project Boilerplate</h3>
            <div class="space-y-1 mt-1 max-h-80 overflow-y-auto">
              {#each Object.entries(templatePresets) as [key, preset]}
                {@const Icon = getPresetIcon(key)}
                <button class="w-full text-left p-2 rounded-lg hover:bg-slate-900 flex items-start space-x-2.5 transition group {activePresetName === preset.name ? 'bg-slate-900/60 border border-slate-800' : 'border border-transparent'}" onclick={() => loadPreset(key)}>
                  <div class="w-7 h-7 rounded-md bg-slate-900 border border-slate-800 group-hover:bg-indigo-600 group-hover:border-indigo-500 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-white transition">
                    <Icon class="w-4 h-4" />
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">{preset.name}</h4>
                    <p class="text-[10px] text-slate-500 mt-0.5 leading-normal">{preset.description}</p>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Divider -->
      <span class="h-5 w-1px bg-slate-800/80"></span>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-1.5">
        <button class="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition flex items-center space-x-1.5" onclick={resetToDefault} title="Restore placeholder widgets">
          <RotateCcw class="w-3.5 h-3.5" />
          <span class="hidden md:inline">Reset Default</span>
        </button>
        <button class="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-red-400 rounded-lg text-xs font-bold transition flex items-center space-x-1.5" onclick={clearAll} title="Clear workspace completely">
          <Trash2 class="w-3.5 h-3.5" />
          <span class="hidden md:inline">Clear Workspace</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Split Screen Editor Pane -->
  <main class="flex-1 w-full flex overflow-hidden">
    <!-- Split Pane 1: Left Form / Widget builder -->
    <section class="w-full lg:w-[42%] xl:w-[35%] h-full shrink-0">
      <LeftPanel bind:sections />
    </section>

    <!-- Split Pane 2: Right Live Rendered / Raw editor output -->
    <section class="hidden lg:block lg:flex-1 h-full shrink-0">
      <RightPanel 
        bind:markdown 
        onRawChange={handleRawMarkdownChange} 
      />
    </section>
  </main>
</div>
