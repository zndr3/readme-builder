<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import { createSection, type READMESection, type SectionType, defaultSectionContent } from '../utils/sections';
  import SectionForm from './SectionForm.svelte';
  import BadgeSelector from './BadgeSelector.svelte';
  import ImageUploader from './ImageUploader.svelte';
  import { 
    GripVertical, Eye, EyeOff, Copy, Trash2, ChevronDown, ChevronRight, Plus, 
    Layers, Image as ImageIcon, Code, CheckSquare, Settings, HelpCircle, 
    FileText, Globe, Key, List, Info, Sparkles, BookOpen, Send
  } from 'lucide-svelte';

  // Svelte 5 props
  let { 
    sections = $bindable(),
    currentRepo = null,
    onOpenCommit
  } = $props<{ 
    sections: READMESection[];
    currentRepo: any;
    onOpenCommit?: () => void;
  }>();

  // Left Panel Sub-tabs: 'widgets' | 'badges' | 'images'
  let activeTab = $state<'widgets' | 'badges' | 'images'>('widgets');

  // Accordion state tracker mapping section.id -> boolean
  let expandedSections = $state<Record<string, boolean>>({});

  // Add Section Dropdown display
  let showAddDropdown = $state(false);

  // Helper mapping widget type to decorative Icon
  function getSectionIcon(type: SectionType) {
    switch (type) {
      case 'title': return Globe;
      case 'description': return Info;
      case 'installation': return Layers;
      case 'usage': return Code;
      case 'features': return CheckSquare;
      case 'tech-stack': return Sparkles;
      case 'screenshots': return ImageIcon;
      case 'env-vars': return Key;
      case 'api-setup': return Settings;
      case 'folder-structure': return BookOpen;
      case 'contributing': return List;
      case 'license': return FileText;
      case 'socials': return Globe;
      case 'faq': return HelpCircle;
      case 'roadmap': return CheckSquare;
      case 'demo-links': return Globe;
      case 'toc': return List;
      case 'custom-markdown': return FileText;
      default: return FileText;
    }
  }

  // Toggle visual expanded accordion
  function toggleExpand(id: string) {
    expandedSections[id] = !expandedSections[id];
  }

  // Add a new README section to the bottom of the builder
  function addNewSection(type: SectionType) {
    const sec = createSection(type);
    sections = [...sections, sec];
    expandedSections[sec.id] = true; // Auto expand new widget
    showAddDropdown = false;
  }

  // Duplicate an existing Svelte section state
  function duplicateSection(section: READMESection, index: number) {
    const duplicated: READMESection = {
      id: Math.random().toString(36).substring(2, 9),
      type: section.type,
      title: `${section.title} (Copy)`,
      visible: section.visible,
      content: JSON.parse(JSON.stringify(section.content)) // Deep copy contents
    };
    
    sections.splice(index + 1, 0, duplicated);
    sections = [...sections];
    expandedSections[duplicated.id] = true;
  }

  // Delete a section
  function deleteSection(index: number) {
    sections.splice(index, 1);
    sections = [...sections];
  }

  // Toggle visibility status
  function toggleVisibility(index: number) {
    sections[index].visible = !sections[index].visible;
    sections = [...sections];
  }

  // Drag and drop consider/finalize handlers for svelte-dnd-action
  function handleDndConsider(e: any) {
    sections = e.detail.items;
  }

  function handleDndFinalize(e: any) {
    sections = e.detail.items;
  }

  // Dropdown list items of all 18 categories for quick select
  const availableWidgetTypes: { type: SectionType; name: string; desc: string }[] = [
    { type: 'title', name: 'Project Title', desc: 'Main header title & tagline block' },
    { type: 'description', name: 'Description', desc: 'Evocative outline explaining what the project is' },
    { type: 'installation', name: 'Installation', desc: 'Prerequisites & setup bash instructions' },
    { type: 'usage', name: 'Usage', desc: 'Code examples block & usage commands' },
    { type: 'features', name: 'Features', desc: 'Bulleted checklist showcasing advantages' },
    { type: 'tech-stack', name: 'Tech Stack', desc: 'Technology badges container' },
    { type: 'screenshots', name: 'Screenshots / GIFs', desc: 'Mock assets previews list or visual grids' },
    { type: 'env-vars', name: 'Environment Variables', desc: '.env templates list and explanations' },
    { type: 'api-setup', name: 'API Reference', desc: 'Endpoint, HTTP methods, requests & responses' },
    { type: 'folder-structure', name: 'Folder Structure', desc: 'Visual tree directory directory map' },
    { type: 'roadmap', name: 'Roadmap', desc: 'Interactive feature checklist with todo status' },
    { type: 'faq', name: 'FAQ Accordions', desc: 'Collapsible questions & answers details' },
    { type: 'demo-links', name: 'Demo / Deploy Links', desc: 'Live deployments urls and badges' },
    { type: 'contributing', name: 'Contributing', desc: 'Contribution guidelines boilerplate' },
    { type: 'license', name: 'License', desc: 'Copyright guidelines & license selection' },
    { type: 'socials', name: 'Social / Contact Links', desc: 'Platform badges (GitHub, LinkedIn)' },
    { type: 'toc', name: 'Table of Contents', desc: 'Anchor links listing sections automatically' },
    { type: 'custom-markdown', name: 'Custom Markdown Block', desc: 'Freeform HTML or markdown inputs' }
  ];
</script>

<div class="h-full flex flex-col bg-slate-900/40 border-r border-slate-800/80">
  <!-- Side Toolbar Tabs -->
  <div class="flex border-b border-slate-800 bg-slate-950/40 p-1 space-x-1 shrink-0">
    <button class="flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 {activeTab === 'widgets' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}" onclick={() => activeTab = 'widgets'}>
      <span>🧩 README Builder</span>
    </button>
    <button class="flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 {activeTab === 'badges' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}" onclick={() => activeTab = 'badges'}>
      <span>🏅 Tech Badges</span>
    </button>
    <button class="flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 {activeTab === 'images' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}" onclick={() => activeTab = 'images'}>
      <span>📷 Images Simulator</span>
    </button>
  </div>

  <!-- TAB CONTENT PANEL -->
  <div class="flex-1 overflow-y-auto p-4 space-y-4">
    <!-- TAB 1: DRAG AND DROP FORM BUILDER -->
    {#if activeTab === 'widgets'}
      <div class="flex justify-between items-center shrink-0">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Sections ({sections.length})</span>
        
        <div class="flex items-center space-x-2">
          {#if currentRepo && onOpenCommit}
            <button 
              class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-bold flex items-center transition shadow-md cursor-pointer"
              onclick={onOpenCommit}
            >
              <Send class="w-3.5 h-3.5 mr-1" /> Commit
            </button>
          {/if}

          <!-- Add Section Button -->
          <div class="relative">
            <button class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-bold flex items-center transition shadow-md cursor-pointer" onclick={() => showAddDropdown = !showAddDropdown}>
              <Plus class="w-3.5 h-3.5 mr-1" /> Add Section
            </button>
            
            {#if showAddDropdown}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div class="fixed inset-0 z-40" onclick={() => showAddDropdown = false}></div>
              <div class="absolute right-0 mt-2 w-72 bg-slate-950 border border-slate-850 rounded-xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto">
                <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1 mb-1 border-b border-slate-900">Select Section Template</h4>
                {#each availableWidgetTypes as widget (widget.type)}
                  {@const Icon = getSectionIcon(widget.type)}
                  <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 flex items-start space-x-2.5 transition group" onclick={() => addNewSection(widget.type)}>
                    <div class="w-6 h-6 rounded bg-slate-900 border border-slate-800 group-hover:bg-indigo-600 group-hover:border-indigo-500 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-white transition">
                      <Icon class="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 class="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">{widget.name}</h5>
                      <p class="text-[10px] text-slate-500 mt-0.5 leading-normal">{widget.desc}</p>
                    </div>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Drag and Drop DND Zone -->
      <div 
        use:dndzone={{ items: sections, flipDurationMs: 200, dragDisabled: false, dropTargetStyle: {} }} 
        onconsider={handleDndConsider} 
        onfinalize={handleDndFinalize} 
        class="space-y-3 min-h-[300px] pb-10"
      >
        {#each sections as section, idx (section.id)}
          {@const Icon = getSectionIcon(section.type)}
          <div 
            animate:flip={{ duration: 200 }} 
            class="bg-slate-950/80 rounded-xl border transition-all duration-200 overflow-hidden {section.visible ? 'border-slate-800/80' : 'border-slate-900 opacity-60 bg-slate-950/30'}"
          >
            <!-- Card Header -->
            <div class="px-3 py-2.5 flex items-center justify-between bg-slate-950 border-b border-slate-900 select-none">
              <!-- Left Grip & Title -->
              <div class="flex items-center space-x-2.5 min-w-0 flex-1">
                <button class="text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing shrink-0" title="Drag to reorder">
                  <GripVertical class="w-4 h-4" />
                </button>
                <div class="w-6 h-6 rounded bg-slate-900 border border-slate-850 flex items-center justify-center shrink-0 text-slate-400">
                  <Icon class="w-3.5 h-3.5 text-indigo-400" />
                </div>
                
                <!-- Editable Header title -->
                <input 
                  type="text" 
                  class="bg-transparent border-none p-0 text-xs font-bold text-slate-200 focus:outline-none focus:ring-0 truncate flex-1 min-w-0" 
                  bind:value={section.title} 
                />
              </div>

              <!-- Action Toolbar -->
              <div class="flex items-center space-x-1 ml-2 shrink-0">
                <!-- Toggle Visibility -->
                <button class="p-1 rounded text-slate-500 hover:text-indigo-400 hover:bg-slate-900 transition" onclick={() => toggleVisibility(idx)} title={section.visible ? 'Hide section from README' : 'Show section in README'}>
                  {#if section.visible}
                    <Eye class="w-3.5 h-3.5 text-indigo-400" />
                  {:else}
                    <EyeOff class="w-3.5 h-3.5" />
                  {/if}
                </button>
                <!-- Duplicate -->
                <button class="p-1 rounded text-slate-500 hover:text-indigo-400 hover:bg-slate-900 transition" onclick={() => duplicateSection(section, idx)} title="Duplicate Section">
                  <Copy class="w-3.5 h-3.5" />
                </button>
                <!-- Delete -->
                <button class="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-900 transition" onclick={() => deleteSection(idx)} title="Delete Section">
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
                <!-- Expand / Collapse chevron -->
                <button class="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900 transition" onclick={() => toggleExpand(section.id)} title="Expand fields">
                  {#if expandedSections[section.id]}
                    <ChevronDown class="w-3.5 h-3.5" />
                  {:else}
                    <ChevronRight class="w-3.5 h-3.5" />
                  {/if}
                </button>
              </div>
            </div>

            <!-- Card Editable Form Body -->
            {#if expandedSections[section.id]}
              <div class="p-4 bg-slate-950/40 border-t border-slate-900/50">
                <SectionForm {section} />
              </div>
            {/if}
          </div>
        {/each}

        {#if sections.length === 0}
          <div class="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-500">
            <Layers class="w-8 h-8 mx-auto text-slate-600 mb-2.5" />
            <h4 class="text-xs font-bold text-slate-400">README builder is empty</h4>
            <p class="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Add section components using the **Add Section** button above or load a pre-configured template to bootstrap in one click!
            </p>
          </div>
        {/if}
      </div>

    <!-- TAB 2: TECH BADGE CATALOG -->
    {:else}
    {#if activeTab === 'badges'}
      <BadgeSelector bind:sections />

    <!-- TAB 3: IMAGE SIMULATOR -->
    {:else}
    {#if activeTab === 'images'}
      <ImageUploader bind:sections />
    {/if}
    {/if}
    {/if}
  </div>
</div>
