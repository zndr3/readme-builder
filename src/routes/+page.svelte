<script lang="ts">
  import { onMount } from 'svelte';
  import { templatePresets } from '$lib/utils/presets';
  import { createSection, type READMESection } from '$lib/utils/sections';
  import { compileMarkdown, parseMarkdown } from '$lib/utils/markdown-generator';
  import { compileScannedReadme, BADGE_REGISTRY } from '$lib/utils/heuristics';
  import LeftPanel from '$lib/components/LeftPanel.svelte';
  import RightPanel from '$lib/components/RightPanel.svelte';
  import RepoPickerModal from '$lib/components/RepoPickerModal.svelte';
  import ReadmeImportModal from '$lib/components/ReadmeImportModal.svelte';
  import CommitPanel from '$lib/components/CommitPanel.svelte';
  import { assets } from '$lib/stores/assets';
  
  import { 
    Layers, Briefcase, Package, Smartphone, Cpu, Zap, Settings, 
    Gamepad, ChevronDown, Trash2, RotateCcw, LogOut, Loader2
  } from 'lucide-svelte';

  // Session Data from Layout (Svelte 5 pages receive data as a prop)
  interface SessionData {
    user: { name: string; avatar_url: string; login: string } | null;
  }
  let { data } = $props<{ data: SessionData }>();
  const user = $derived(data.user);

  // Global Reactive States in Svelte 5
  let sections = $state<READMESection[]>([]);
  let markdown = $state<string>('');
  let isEditingRaw = $state(false);

  // Preset Selector Dropdown visual state
  let showPresetsDropdown = $state(false);
  let activePresetName = $state('Fullstack App');

  // Scanner & GitHub integration states
  let showRepoPicker = $state(false);
  let showImportModal = $state(false);
  let showCommitPanel = $state(false);
  let isScanning = $state(false);
  
  interface ScannedPayload {
    projectName: string;
    description: string;
    isNode: boolean;
    isPython: boolean;
    packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'pip' | 'unknown';
    installCommands: string;
    runCommands: string;
    detectedTechnologies: string[];
    envVars: Array<{ name: string; description: string; defaultValue: string }>;
    license: { type: string; author: string; year: string } | null;
    screenshots: Array<{ url: string; alt: string; caption: string }>;
    folderTree: string;
    existingReadme: string | null;
  }
  let scannedPayload = $state<ScannedPayload | null>(null);
  
  let currentRepo = $state<{
    owner: string;
    name: string;
    defaultBranch: string;
    originalReadme: string;
  } | null>(null);

  $effect(() => {
    if (!isEditingRaw) {
      markdown = compileMarkdown(sections);
    }
  });

  // Synchronize asset store changes back to the widgets in real-time
  $effect(() => {
    const assetList = $assets;
    let sectionsChanged = false;

    const updatedSections = sections.map(sec => {
      if (sec.type === 'image') {
        const asset = assetList.find(a => a.id === sec.content.assetId);
        if (asset) {
          let updated = false;
          const newContent = { ...sec.content };
          if (newContent.repositoryPath !== asset.repositoryPath) {
            newContent.repositoryPath = asset.repositoryPath;
            updated = true;
          }
          if (newContent.altText !== asset.altText) {
            newContent.altText = asset.altText;
            updated = true;
          }
          if (updated) {
            sectionsChanged = true;
            return { ...sec, content: newContent };
          }
        } else if (sec.content.assetId) {
          // Referenced asset was deleted, clear the asset reference
          sectionsChanged = true;
          return {
            ...sec,
            content: {
              ...sec.content,
              assetId: '',
              repositoryPath: ''
            }
          };
        }
      } else if (sec.type === 'screenshots' && sec.content.images) {
        // Filter out images whose asset IDs are no longer in the store
        // (Only if they have an ID and were uploaded through the system)
        const originalLength = sec.content.images.length;
        const newImages = sec.content.images
          .filter((img: any) => !img.id || assetList.some(a => a.id === img.id))
          .map((img: any) => {
            if (!img.id) return img;
            const asset = assetList.find(a => a.id === img.id);
            if (asset) {
              let updated = false;
              const newImg = { ...img };
              if (newImg.repositoryPath !== asset.repositoryPath) {
                newImg.repositoryPath = asset.repositoryPath;
                newImg.url = asset.repositoryPath;
                updated = true;
              }
              if (newImg.alt !== asset.altText) {
                newImg.alt = asset.altText;
                updated = true;
              }
              if (newImg.previewUrl !== asset.previewUrl) {
                newImg.previewUrl = asset.previewUrl;
                updated = true;
              }
              if (newImg.fileName !== asset.fileName) {
                newImg.fileName = asset.fileName;
                updated = true;
              }
              if (updated) {
                sectionsChanged = true;
                return newImg;
              }
            }
            return img;
          });

        if (newImages.length !== originalLength || sectionsChanged) {
          sectionsChanged = true;
          return { ...sec, content: { ...sec.content, images: newImages } };
        }
      }
      return sec;
    });

    if (sectionsChanged) {
      sections = updatedSections;
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
      sections = JSON.parse(JSON.stringify(preset.sections));
      activePresetName = preset.name;
      isEditingRaw = false; // Reset raw edit lock to force fresh compile
      showPresetsDropdown = false;
      currentRepo = null; // Clear working repo when moving to local presets
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
    currentRepo = null;
  }

  // Clear workspace empty
  function clearAll() {
    sections = [];
    activePresetName = 'Blank';
    markdown = '';
    isEditingRaw = false;
    currentRepo = null;
  }

  // Repository scan handler
  async function handleSelectRepo(repoInfo: { owner: string; name: string; defaultBranch: string }) {
    isScanning = true;
    try {
      const res = await fetch(`/api/github/scan?owner=${repoInfo.owner}&repo=${repoInfo.name}&branch=${repoInfo.defaultBranch}`);
      if (!res.ok) {
        alert('Scanning failed. Please make sure your authorization has not expired.');
        return;
      }

      const payload = await res.json();
      scannedPayload = payload;
      currentRepo = {
        owner: repoInfo.owner,
        name: repoInfo.name,
        defaultBranch: repoInfo.defaultBranch,
        originalReadme: payload.existingReadme || ''
      };

      if (payload.existingReadme) {
        // Show options modal since repository already has README.md
        showImportModal = true;
      } else {
        // Standard scan layout generation
        sections = compileScannedReadme(payload);
        activePresetName = `Scanned: ${payload.projectName}`;
        isEditingRaw = false;
      }
    } catch (e) {
      console.error('Scan operations failed:', e);
    } finally {
      isScanning = false;
    }
  }

  // Readme Import Modals Option Callback
  function handleImportOption(option: 'improve' | 'replace' | 'merge') {
    if (!scannedPayload) return;

    if (option === 'replace') {
      sections = compileScannedReadme(scannedPayload);
      activePresetName = `Scanned: ${scannedPayload.projectName}`;
    } else if (option === 'merge') {
      const original = parseMarkdown(scannedPayload.existingReadme || '');
      const scanned = compileScannedReadme(scannedPayload);
      
      // Filter out redundant titles and descriptions from scanned layout
      const additional = scanned.filter(s => s.type !== 'title' && s.type !== 'description');
      sections = [...original, ...additional];
      activePresetName = `Merged: ${scannedPayload.projectName}`;
    } else if (option === 'improve') {
      const original = parseMarkdown(scannedPayload.existingReadme || '');

      // A. Merge detected stack badges
      let techSec = original.find(s => s.type === 'tech-stack');
      if (!techSec && scannedPayload.detectedTechnologies.length > 0) {
        techSec = createSection('tech-stack');
        techSec.content.badges = [];
        const titleIdx = original.findIndex(s => s.type === 'title');
        const descIdx = original.findIndex(s => s.type === 'description');
        const insertAt = Math.max(0, titleIdx, descIdx) + 1;
        original.splice(insertAt, 0, techSec);
      }
      
      if (techSec && scannedPayload.detectedTechnologies.length > 0) {
        const existingLabels = new Set(techSec.content.badges.map((b: { label: string }) => b.label.toLowerCase()));
        scannedPayload.detectedTechnologies.forEach((tech: string) => {
          const key = tech.toLowerCase().replace(/[^a-z]/g, '');
          if (BADGE_REGISTRY[key] && !existingLabels.has(tech.toLowerCase())) {
            techSec.content.badges.push({ ...BADGE_REGISTRY[key] });
          }
        });
      }

      // B. Merge lockfile setup commands
      let installSec = original.find(s => s.type === 'installation');
      if (!installSec && scannedPayload.installCommands) {
        installSec = createSection('installation');
        original.push(installSec);
      }
      if (installSec && (!installSec.content.commands || installSec.content.commands.trim().startsWith('# Clone the repository'))) {
        installSec.content.commands = scannedPayload.installCommands;
        installSec.content.prerequisites = scannedPayload.isNode ? 'Node.js v18+' : scannedPayload.isPython ? 'Python 3.9+' : '';
      }

      // C. Populate env variables table if missing
      let envSec = original.find(s => s.type === 'env-vars');
      if (!envSec && scannedPayload.envVars && scannedPayload.envVars.length > 0) {
        envSec = createSection('env-vars');
        envSec.content.vars = scannedPayload.envVars.map((v: { name: string; description?: string; defaultValue?: string }) => ({
          name: v.name,
          description: v.description,
          defaultValue: v.defaultValue
        }));
        original.push(envSec);
      }

      // D. Populate folder structure tree if missing
      let folderSec = original.find(s => s.type === 'folder-structure');
      if (!folderSec) {
        folderSec = createSection('folder-structure');
        folderSec.content.tree = scannedPayload.folderTree;
        folderSec.content.explanation = 'Auto-scanned layout listing primary folders and configs.';
        original.push(folderSec);
      }

      sections = original;
      activePresetName = `Enriched: ${scannedPayload.projectName}`;
    }

    isEditingRaw = false; // Reset to force compilation sync
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
        <h1 class="text-xs md:text-sm font-extrabold tracking-tight text-white flex items-center">
          GitHub README Builder
          <span class="ml-2 px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-900/50 text-[10px] font-bold text-indigo-400">Intelligent</span>
        </h1>
        <p class="text-[9px] text-slate-500 font-medium">Build professional documentations in real-time</p>
      </div>
    </div>

    <!-- Active Template Preset dropdown & Auth controllers -->
    <div class="flex items-center space-x-3.5">
      
      <!-- Preset Dropdown -->
      <div class="relative hidden sm:block">
        <button class="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-bold text-slate-200 hover:text-white flex items-center space-x-2 transition shadow-sm" onclick={() => showPresetsDropdown = !showPresetsDropdown}>
          <span class="text-slate-400">Boilerplate:</span>
          <span class="text-indigo-400">{activePresetName}</span>
          <ChevronDown class="w-3.5 h-3.5 text-slate-500" />
        </button>

        {#if showPresetsDropdown}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="fixed inset-0 z-40" onclick={() => showPresetsDropdown = false}></div>
          <div class="absolute right-0 mt-2 w-72 bg-slate-950 border border-slate-850 rounded-xl shadow-2xl p-2.5 z-50">
            <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1 mb-1 border-b border-slate-900">Choose Project Template</h3>
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
      <span class="h-5 w-[1px] bg-slate-800/80 hidden sm:inline"></span>

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

      <!-- Divider -->
      <span class="h-5 w-[1px] bg-slate-800/80"></span>

      <!-- Secure GitHub OAuth Integration -->
      <div class="flex items-center space-x-2">
        {#if user}
          <!-- User Session Info -->
          <div class="flex items-center space-x-2 border border-slate-850 px-2 py-1 rounded-lg bg-slate-950/30">
            <img src={user.avatar_url} alt={user.name} class="w-5 h-5 rounded-full border border-slate-800" />
            <span class="text-xs font-bold text-slate-200 hidden md:inline">{user.name}</span>
          </div>

          <!-- Import repo -->
          <button 
            class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-indigo-600/10 cursor-pointer disabled:opacity-60"
            onclick={() => showRepoPicker = true}
            disabled={isScanning}
          >
            {#if isScanning}
              <Loader2 class="w-3.5 h-3.5 animate-spin" />
              <span>Scanning...</span>
            {:else}
              <Package class="w-3.5 h-3.5" />
              <span class="hidden md:inline">Import Repository</span>
              <span class="inline md:hidden">Import</span>
            {/if}
          </button>

          <!-- Logout -->
          <form action="/auth/logout" method="POST" class="inline">
            <button 
              type="submit" 
              class="p-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-500 hover:text-red-400 rounded-lg text-xs transition cursor-pointer" 
              title="Log Out"
            >
              <LogOut class="w-3.5 h-3.5" />
            </button>
          </form>
        {:else}
          <!-- GitHub Login Button -->
          <button 
            class="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 rounded-lg text-xs font-bold transition flex items-center space-x-2 shadow-sm cursor-pointer"
            onclick={() => window.location.href = '/auth/login'}
          >
            <Package class="w-3.5 h-3.5 fill-indigo-400/10" />
            <span>Connect GitHub</span>
          </button>
        {/if}
      </div>

    </div>
  </header>

  <!-- Split Screen Editor Pane -->
  <main class="flex-1 w-full flex overflow-hidden">
    <!-- Split Pane 1: Left Form / Widget builder -->
    <section class="w-full lg:w-[42%] xl:w-[35%] h-full shrink-0">
      <LeftPanel 
        bind:sections 
        currentRepo={currentRepo} 
        onOpenCommit={() => showCommitPanel = true} 
      />
    </section>

    <!-- Split Pane 2: Right Live Rendered / Raw editor output -->
    <section class="hidden lg:block lg:flex-1 h-full shrink-0">
      <RightPanel 
        bind:markdown 
        onRawChange={handleRawMarkdownChange} 
      />
    </section>
  </main>

  <!-- Interactive Integrations Modals -->
  <RepoPickerModal 
    bind:isOpen={showRepoPicker} 
    onSelectRepo={handleSelectRepo} 
  />

  <ReadmeImportModal 
    bind:isOpen={showImportModal} 
    onSelectOption={handleImportOption} 
  />

  <CommitPanel 
    bind:isOpen={showCommitPanel} 
    owner={currentRepo?.owner || ''} 
    repo={currentRepo?.name || ''} 
    branch={currentRepo?.defaultBranch || 'main'} 
    newMarkdown={markdown} 
    originalMarkdown={currentRepo?.originalReadme || ''} 
  />
</div>
