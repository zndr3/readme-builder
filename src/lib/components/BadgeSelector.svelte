<script lang="ts">
  import { techBadgesCatalog, type TechBadge } from '../utils/badges';
  import { createSection, type READMESection } from '../utils/sections';
  import { Search, Plus, Palette, Check, Star } from 'lucide-svelte';

  // Svelte 5 props
  let { sections = $bindable() } = $props<{ sections: READMESection[] }>();

  // Interactive filters
  let searchQuery = $state('');
  let selectedCategory = $state<'all' | TechBadge['category']>('all');

  // Custom Badge Designer state
  let customBadge = $state({
    label: '',
    message: 'Badge Text',
    color: '4F46E5', // Indigo
    logo: ''
  });

  // Color preset options for Custom Designer
  const colorPresets = [
    { name: 'Indigo', hex: '4F46E5' },
    { name: 'Emerald', hex: '10B981' },
    { name: 'Sky', hex: '0EA5E9' },
    { name: 'Amber', hex: 'F59E0B' },
    { name: 'Rose', hex: 'F43F5E' },
    { name: 'Slate', hex: '475569' },
    { name: 'Purple', hex: 'A855F7' },
    { name: 'Pink', hex: 'EC4899' }
  ];

  // Filters catalog list based on search and category tab
  const filteredCatalog = $derived.by(() => {
    let list = techBadgesCatalog;
    
    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(b => b.category === selectedCategory);
    }
    
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(b => 
        b.label.toLowerCase().includes(q) || 
        b.message.toLowerCase().includes(q)
      );
    }
    
    return list;
  });

  // Adds selected badge into the README's active 'tech-stack' section
  function addBadge(badge: { label: string; message: string; color: string; logo: string }) {
    // 1. Locate active tech-stack widget in sections list
    let techSec = sections.find(s => s.type === 'tech-stack');
    
    // 2. If it doesn't exist, create a new one and append it to the workspace
    if (!techSec) {
      techSec = createSection('tech-stack');
      techSec.content.badges = []; // Start fresh
      // Insert right after the title/description if possible, or at the top
      const titleIndex = sections.findIndex(s => s.type === 'title');
      const descIndex = sections.findIndex(s => s.type === 'description');
      const insertAt = Math.max(0, titleIndex, descIndex) + 1;
      sections.splice(insertAt, 0, techSec);
    }

    // 3. Prevent duplicate badges
    const exists = techSec.content.badges.some((b: any) => 
      b.label.toLowerCase() === badge.label.toLowerCase()
    );

    if (!exists) {
      techSec.content.badges.push({
        label: badge.label,
        message: badge.message,
        color: badge.color.replace('#', ''),
        logo: badge.logo
      });
      // Force UI updates in Svelte 5 by triggering a rebinding of sections
      sections = [...sections];
    }
  }

  function handleCustomBadgeSubmit(e: Event) {
    e.preventDefault();
    if (!customBadge.message) return;
    
    addBadge({
      label: customBadge.label || customBadge.message,
      message: customBadge.message,
      color: customBadge.color,
      logo: customBadge.logo.toLowerCase().trim()
    });

    // Reset some custom parameters
    customBadge.label = '';
    customBadge.logo = '';
  }
</script>

<div class="glass-panel p-4 rounded-xl border border-slate-800 space-y-4">
  <div class="flex justify-between items-center">
    <div>
      <h3 class="text-sm font-bold text-white flex items-center">
        <Star class="w-4 h-4 text-indigo-400 mr-1.5 fill-indigo-400/20" /> Tech Badges Catalog
      </h3>
      <p class="text-[11px] text-slate-400 mt-0.5">Click badges to instantly inject them into your Tech Stack.</p>
    </div>
  </div>

  <!-- Search and Categories -->
  <div class="space-y-2">
    <div class="relative">
      <Search class="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
      <input type="text" class="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-xs text-slate-200 placeholder-slate-500" placeholder="Search 60+ technologies (React, Django, Docker...)" bind:value={searchQuery} />
    </div>

    <!-- Category Tabs -->
    <div class="flex flex-wrap gap-1 p-0.5 bg-slate-950 rounded-md border border-slate-850">
      {#each [
        { id: 'all', label: 'All' },
        { id: 'languages', label: 'Languages' },
        { id: 'frontend', label: 'Frontend' },
        { id: 'backend', label: 'Backend' },
        { id: 'database', label: 'Databases' },
        { id: 'devops', label: 'Devops' }
      ] as tab (tab.id)}
        <button class="px-2 py-1 rounded text-[10px] font-semibold transition-all {selectedCategory === tab.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}" onclick={() => selectedCategory = tab.id as any}>
          {tab.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Badges Catalog Grid -->
  <div class="max-h-48 overflow-y-auto pr-1">
    <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2">
      {#each filteredCatalog as badge (badge.label)}
        <button class="group p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-lg flex items-center justify-between text-left transition duration-200" onclick={() => addBadge(badge)}>
          <div class="flex items-center space-x-2 truncate">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: #{badge.color}"></span>
            <span class="text-xs font-medium text-slate-200 truncate group-hover:text-indigo-400">{badge.label}</span>
          </div>
          <Plus class="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0" />
        </button>
      {/each}
      {#if filteredCatalog.length === 0}
        <div class="col-span-full py-4 text-center text-xs text-slate-500">
          No technologies matching "{searchQuery}" found.
        </div>
      {/if}
    </div>
  </div>

  <hr class="border-slate-800/80" />

  <!-- Custom Badge Builder Form -->
  <form class="space-y-3" onsubmit={handleCustomBadgeSubmit}>
    <h4 class="text-xs font-bold text-slate-200 flex items-center">
      <Palette class="w-3.5 h-3.5 text-indigo-400 mr-1.5" /> Custom Shields.io Designer
    </h4>

    <div class="grid grid-cols-2 gap-2 text-xs">
      <div>
        <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Badge Label (Optional)</label>
        <input type="text" class="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs placeholder-slate-600 text-slate-200" placeholder="e.g. Version" bind:value={customBadge.label} />
      </div>
      <div>
        <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Badge Message</label>
        <input type="text" class="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs text-slate-200 font-medium" placeholder="e.g. v1.0.0" required bind:value={customBadge.message} />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 text-xs">
      <div>
        <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Brand Hex Color</label>
        <div class="flex space-x-1.5">
          <input type="text" class="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs font-mono text-indigo-300" placeholder="4F46E5" bind:value={customBadge.color} />
          <div class="w-8 h-8 rounded border border-slate-800 shrink-0 shadow-sm" style="background-color: #{customBadge.color}"></div>
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Simple Icon Logo (Optional)</label>
        <input type="text" class="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs placeholder-slate-600 font-mono" placeholder="e.g. svelte" bind:value={customBadge.logo} />
      </div>
    </div>

    <!-- Quick Colors Picker -->
    <div class="space-y-1">
      <label class="block text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Quick Colors</label>
      <div class="flex flex-wrap gap-1">
        {#each colorPresets as preset (preset.name)}
          <button type="button" class="w-5 h-5 rounded-full border border-slate-800 transition transform hover:scale-110 flex items-center justify-center shrink-0 relative" style="background-color: #{preset.hex}" onclick={() => customBadge.color = preset.hex} title={preset.name}>
            {#if customBadge.color === preset.hex}
              <Check class="w-2.5 h-2.5 text-white stroke-[3px]" />
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <!-- Submit Custom Badge -->
    <button type="submit" class="w-full py-1.5 bg-slate-950 hover:bg-slate-900 text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-md text-xs font-semibold flex items-center justify-center transition">
      <Plus class="w-3.5 h-3.5 mr-1" /> Add Custom Badge to README
    </button>
  </form>
</div>
