<script lang="ts">
  import type { READMESection } from '../utils/sections';
  import { Plus, Trash2, HelpCircle, FolderTree, AlignLeft, AlignCenter, AlignRight } from 'lucide-svelte';

  // Svelte 5 props
  let { section } = $props<{ section: READMESection }>();

  // Temporary input state variables for lists and key-values
  let newFeatureItem = $state('');
  let newEnvVar = $state({ name: '', description: '', defaultValue: '' });
  let newFaqItem = $state({ question: '', answer: '' });
  let newRoadmapItem = $state({ text: '', completed: false });
  let newDemoLink = $state({ label: '', url: '' });
  let newScreenshot = $state({ url: '', alt: '', caption: '' });
  let newSocial = $state({ platform: 'GitHub', username: '', url: '', color: '181717' });

  // Add Item Helpers
  function addFeature() {
    if (!newFeatureItem.trim()) return;
    if (!section.content.items) section.content.items = [];
    section.content.items.push(newFeatureItem.trim());
    newFeatureItem = '';
  }

  function removeFeature(index: number) {
    section.content.items.splice(index, 1);
  }

  function addEnvVar() {
    if (!newEnvVar.name.trim()) return;
    if (!section.content.vars) section.content.vars = [];
    section.content.vars.push({ ...newEnvVar });
    newEnvVar = { name: '', description: '', defaultValue: '' };
  }

  function removeEnvVar(index: number) {
    section.content.vars.splice(index, 1);
  }

  function addFaq() {
    if (!newFaqItem.question.trim() || !newFaqItem.answer.trim()) return;
    if (!section.content.items) section.content.items = [];
    section.content.items.push({ ...newFaqItem });
    newFaqItem = { question: '', answer: '' };
  }

  function removeFaq(index: number) {
    section.content.items.splice(index, 1);
  }

  function addRoadmap() {
    if (!newRoadmapItem.text.trim()) return;
    if (!section.content.items) section.content.items = [];
    section.content.items.push({ ...newRoadmapItem });
    newRoadmapItem = { text: '', completed: false };
  }

  function removeRoadmap(index: number) {
    section.content.items.splice(index, 1);
  }

  function addDemoLink() {
    if (!newDemoLink.label.trim() || !newDemoLink.url.trim()) return;
    if (!section.content.items) section.content.items = [];
    section.content.items.push({ ...newDemoLink });
    newDemoLink = { label: '', url: '' };
  }

  function removeDemoLink(index: number) {
    section.content.items.splice(index, 1);
  }

  function addScreenshot() {
    if (!newScreenshot.url.trim()) return;
    if (!section.content.images) section.content.images = [];
    section.content.images.push({ ...newScreenshot });
    newScreenshot = { url: '', alt: '', caption: '' };
  }

  function removeScreenshot(index: number) {
    section.content.images.splice(index, 1);
  }

  function addSocial() {
    if (!newSocial.username.trim() || !newSocial.url.trim()) return;
    if (!section.content.items) section.content.items = [];
    section.content.items.push({ ...newSocial });
    newSocial = { platform: 'GitHub', username: '', url: '', color: '181717' };
  }

  function removeSocial(index: number) {
    section.content.items.splice(index, 1);
  }

  function handleSocialPlatformChange(e: Event) {
    const platform = (e.target as HTMLSelectElement).value;
    let color = '181717';
    let url = '';

    if (platform === 'GitHub') { color = '181717'; url = 'https://github.com/'; }
    else if (platform === 'Twitter/X') { color = '1DA1F2'; url = 'https://twitter.com/'; }
    else if (platform === 'LinkedIn') { color = '0077B5'; url = 'https://linkedin.com/in/'; }
    else if (platform === 'Email') { color = 'EA4335'; url = 'mailto:'; }
    else if (platform === 'Discord') { color = '5865F2'; url = 'https://discord.gg/'; }
    else if (platform === 'Website') { color = '4CAF50'; url = 'https://'; }

    newSocial.platform = platform;
    newSocial.color = color;
    newSocial.url = url;
  }

  function preloadFolderBoilerplate() {
    section.content.tree = `my-project/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── components/
│   │   ├── Button.svelte
│   │   └── Header.svelte
│   └── index.ts
├── static/
│   └── favicon.png
├── package.json
└── README.md`;
  }
</script>

<div class="space-y-4 text-sm text-slate-300">
  <!-- 1. TITLE WIDGET -->
  {#if section.type === 'title'}
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="title-text">Project Title</label>
        <input id="title-text" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-medium text-white" bind:value={section.content.text} />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="title-subtitle">Subtitle / Catchphrase</label>
        <input id="title-subtitle" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-slate-300" bind:value={section.content.subtitle} />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="logo-url">Logo Image URL (Optional)</label>
          <input id="logo-url" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-xs" placeholder="e.g., https://site.com/logo.png" bind:value={section.content.logoUrl} />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="logo-width">Logo Width (px)</label>
          <input id="logo-width" type="number" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-xs" bind:value={section.content.logoWidth} />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Text Alignment</label>
        <div class="flex space-x-1 p-0.5 bg-slate-950 rounded-md max-w-xs border border-slate-800/80">
          <button class="flex-1 flex justify-center py-1.5 rounded-md text-xs font-medium transition-all {section.content.align === 'left' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}" onclick={() => section.content.align = 'left'}>
            <AlignLeft class="w-3.5 h-3.5 mr-1" /> Left
          </button>
          <button class="flex-1 flex justify-center py-1.5 rounded-md text-xs font-medium transition-all {section.content.align === 'center' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}" onclick={() => section.content.align = 'center'}>
            <AlignCenter class="w-3.5 h-3.5 mr-1" /> Center
          </button>
          <button class="flex-1 flex justify-center py-1.5 rounded-md text-xs font-medium transition-all {section.content.align === 'right' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}" onclick={() => section.content.align = 'right'}>
            <AlignRight class="w-3.5 h-3.5 mr-1" /> Right
          </button>
        </div>
      </div>
    </div>

  <!-- 2. DESCRIPTION WIDGET -->
  {:else}
  {#if section.type === 'description'}
    <div>
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="desc-text">Description Content</label>
      <textarea id="desc-text" rows="6" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-sans" bind:value={section.content.text}></textarea>
    </div>

  <!-- 3. INSTALLATION WIDGET -->
  {:else}
  {#if section.type === 'installation'}
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="inst-prereq">Prerequisites (Optional)</label>
        <textarea id="inst-prereq" rows="2" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-emerald-400" placeholder="e.g. Node.js v18+" bind:value={section.content.prerequisites}></textarea>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="inst-commands">Installation Commands</label>
        <textarea id="inst-commands" rows="6" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-indigo-300" bind:value={section.content.commands}></textarea>
      </div>
    </div>

  <!-- 4. USAGE WIDGET -->
  {:else}
  {#if section.type === 'usage'}
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="usage-desc">Usage Description (Optional)</label>
        <input id="usage-desc" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500" bind:value={section.content.description} />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="usage-code">Code Example Block</label>
        <textarea id="usage-code" rows="6" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-indigo-200" bind:value={section.content.codeBlock}></textarea>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="usage-lang">Syntax Highlight Language</label>
        <select id="usage-lang" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-xs" bind:value={section.content.language}>
          <option value="javascript">JavaScript / JSON</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="bash">Bash / Shell</option>
          <option value="python">Python</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="yaml">YAML / Markdown</option>
        </select>
      </div>
    </div>

  <!-- 5. FEATURES WIDGET -->
  {:else}
  {#if section.type === 'features'}
    <div class="space-y-3">
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Features Checklist</label>
      
      <!-- List of active features -->
      <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {#each section.content.items as item, idx}
          <div class="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800/80">
            <span class="text-xs text-indigo-400 font-bold w-4">{idx + 1}.</span>
            <input type="text" class="flex-1 bg-transparent border-none p-0 text-xs text-slate-200 focus:outline-none focus:ring-0" bind:value={section.content.items[idx]} />
            <button class="text-slate-500 hover:text-red-400 transition" onclick={() => removeFeature(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        {/each}
      </div>

      <!-- Add Feature block -->
      <div class="flex space-x-2">
        <input type="text" class="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-xs" placeholder="e.g. ⚡ Fast: Sub-millisecond rendering" bind:value={newFeatureItem} onkeydown={(e) => e.key === 'Enter' && addFeature()} />
        <button class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium flex items-center transition" onclick={addFeature}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add
        </button>
      </div>
    </div>

  <!-- 6. TECH STACK WIDGET -->
  {:else}
  {#if section.type === 'tech-stack'}
    <div class="space-y-3 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
      <div class="flex items-start space-x-2.5">
        <HelpCircle class="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <h4 class="text-xs font-bold text-slate-200">Tech Stack Badge catalog</h4>
          <p class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Manage preloaded technologies here or use the **Badge Catalog** at the top of the Left Panel to search and click-add new Shields.io tech badges!
          </p>
        </div>
      </div>

      <!-- Tech stack badges visualizer and quick delete list -->
      <div class="space-y-1.5 mt-2.5">
        <label class="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Tech Badges ({section.content.badges.length})</label>
        <div class="flex flex-wrap gap-1.5 p-2 bg-slate-900 rounded border border-slate-800">
          {#each section.content.badges as badge, idx}
            <div class="flex items-center space-x-1.5 px-2 py-1 bg-slate-950 text-xs rounded border border-slate-800 text-slate-300 font-mono">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: #{badge.color}"></span>
              <span>{badge.label}</span>
              <button class="text-slate-500 hover:text-red-400 transition ml-1" onclick={() => section.content.badges.splice(idx, 1)}>
                &times;
              </button>
            </div>
          {/each}
          {#if section.content.badges.length === 0}
            <p class="text-xs text-slate-500 py-1 pl-1">No badges added yet.</p>
          {/if}
        </div>
      </div>
    </div>

  <!-- 7. SCREENSHOTS WIDGET -->
  {:else}
  {#if section.type === 'screenshots'}
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Screenshots / Demos</label>
        <select class="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs" bind:value={section.content.style}>
          <option value="list">Vertical List</option>
          <option value="grid">Responsive Row/Grid</option>
        </select>
      </div>

      <!-- Screenshots lists -->
      <div class="space-y-2">
        {#each section.content.images as img, idx}
          <div class="bg-slate-950 p-2.5 rounded border border-slate-800/80 space-y-1.5 relative">
            <button class="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition" onclick={() => removeScreenshot(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
            <div class="flex space-x-2 items-center">
              <span class="text-xs font-bold text-slate-400 font-mono">#{idx+1}</span>
              <span class="text-xs font-semibold text-slate-300 truncate max-w-xs">{img.url}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <input type="text" class="bg-slate-900 border border-slate-850 px-2 py-1 rounded text-slate-300" placeholder="Alt text" bind:value={img.alt} />
              <input type="text" class="bg-slate-900 border border-slate-850 px-2 py-1 rounded text-slate-300" placeholder="Caption description" bind:value={img.caption} />
            </div>
          </div>
        {/each}
      </div>

      <!-- Add Screenshot Form -->
      <div class="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-2">
        <h5 class="text-xs font-semibold text-slate-300">Add Screenshot Info</h5>
        <div class="space-y-1.5 text-xs">
          <input type="text" class="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Image URL (e.g. ./images/preview.png)" bind:value={newScreenshot.url} />
          <div class="grid grid-cols-2 gap-2">
            <input type="text" class="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Alt text" bind:value={newScreenshot.alt} />
            <input type="text" class="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Caption" bind:value={newScreenshot.caption} />
          </div>
        </div>
        <button class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center justify-center transition" onclick={addScreenshot}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add Image
        </button>
      </div>
    </div>

  <!-- 8. ENVIRONMENT VARIABLES WIDGET -->
  {:else}
  {#if section.type === 'env-vars'}
    <div class="space-y-3">
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Variables</label>
      
      <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
        {#each section.content.vars as env, idx}
          <div class="bg-slate-950 p-2 rounded border border-slate-800/80 flex items-start space-x-2 text-xs relative">
            <button class="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition" onclick={() => removeEnvVar(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
            <div class="flex-1 space-y-1">
              <div class="flex items-center space-x-1.5">
                <span class="font-mono text-indigo-400 font-bold bg-slate-900 px-1 py-0.5 rounded text-[11px] border border-slate-800">{env.name}</span>
                {#if env.defaultValue}
                  <span class="text-slate-500 font-mono text-[10px] truncate max-w-[120px]">={env.defaultValue}</span>
                {/if}
              </div>
              <p class="text-[11px] text-slate-400 leading-relaxed pr-6">{env.description || 'No description provided.'}</p>
            </div>
          </div>
        {/each}
      </div>

      <!-- Add Variable Form -->
      <div class="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-2 text-xs">
        <h5 class="text-xs font-semibold text-slate-300">Add Variable Parameters</h5>
        <div class="grid grid-cols-2 gap-2">
          <input type="text" class="px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-xs" placeholder="VARIABLE_NAME" bind:value={newEnvVar.name} />
          <input type="text" class="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Default Value" bind:value={newEnvVar.defaultValue} />
        </div>
        <input type="text" class="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Brief description explaining what this is for" bind:value={newEnvVar.description} onkeydown={(e) => e.key === 'Enter' && addEnvVar()} />
        <button class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center justify-center transition" onclick={addEnvVar}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add Environment Variable
        </button>
      </div>
    </div>

  <!-- 9. API REFERENCE SETUP WIDGET -->
  {:else}
  {#if section.type === 'api-setup'}
    <div class="space-y-3">
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-1">
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="api-method">Method</label>
          <select id="api-method" class="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none text-xs font-bold text-white" bind:value={section.content.method}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="api-endpoint">Endpoint Route</label>
          <input id="api-endpoint" type="text" class="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-slate-200" placeholder="/api/v1/resource" bind:value={section.content.endpoint} />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="api-headers">Request Headers</label>
        <textarea id="api-headers" rows="2" class="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-indigo-300" placeholder="Authorization: Bearer <TOKEN>" bind:value={section.content.headers}></textarea>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="api-body">Request Body (JSON)</label>
          <textarea id="api-body" rows="4" class="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-indigo-200" placeholder="&#123;&#125;" bind:value={section.content.body}></textarea>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="api-response">Response Body (JSON)</label>
          <textarea id="api-response" rows="4" class="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-emerald-400" placeholder="&#123;&#125;" bind:value={section.content.response}></textarea>
        </div>
      </div>
    </div>

  <!-- 10. FOLDER STRUCTURE WIDGET -->
  {:else}
  {#if section.type === 'folder-structure'}
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider" for="folder-tree">Folder Map (Tree)</label>
        <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium flex items-center transition" onclick={preloadFolderBoilerplate}>
          <FolderTree class="w-3.5 h-3.5 mr-1" /> Preload Sample
        </button>
      </div>
      <textarea id="folder-tree" rows="7" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-indigo-200" placeholder="project-root/&#10;├── src/&#10;└── package.json" bind:value={section.content.tree}></textarea>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="folder-desc">Structure Explanation</label>
        <input id="folder-desc" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none" placeholder="Brief paragraph detailing our directory folders." bind:value={section.content.explanation} />
      </div>
    </div>

  <!-- 11. CONTRIBUTING WIDGET -->
  {:else}
  {#if section.type === 'contributing'}
    <div>
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="contrib-text">Contributing Guidelines</label>
      <textarea id="contrib-text" rows="6" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-sans" bind:value={section.content.text}></textarea>
    </div>

  <!-- 12. LICENSE WIDGET -->
  {:else}
  {#if section.type === 'license'}
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="lic-type">License Type</label>
        <select id="lic-type" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none text-xs text-white" bind:value={section.content.type}>
          <option value="MIT">MIT License</option>
          <option value="Apache 2.0">Apache 2.0 License</option>
          <option value="GPL v3">GNU GPL v3 License</option>
          <option value="BSD 3-Clause">BSD 3-Clause License</option>
          <option value="Unlicense">The Unlicense (Public Domain)</option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="lic-author">Copyright Holder / Author</label>
          <input id="lic-author" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500" bind:value={section.content.author} />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="lic-year">Copyright Year</label>
          <input id="lic-year" type="text" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500" bind:value={section.content.year} />
        </div>
      </div>
    </div>

  <!-- 13. SOCIALS WIDGET -->
  {:else}
  {#if section.type === 'socials'}
    <div class="space-y-3">
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Social Links Grid</label>
      
      <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {#each section.content.items as item, idx}
          <div class="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800/80 text-xs">
            <span class="w-2.5 h-2.5 rounded-full" style="background-color: #{item.color}"></span>
            <span class="font-bold text-slate-300 w-20 truncate">{item.platform}:</span>
            <span class="text-slate-400 flex-1 truncate">{item.username}</span>
            <button class="text-slate-500 hover:text-red-400 transition" onclick={() => removeSocial(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        {/each}
      </div>

      <!-- Add Social Link Form -->
      <div class="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-2 text-xs">
        <h5 class="text-xs font-semibold text-slate-300">Add Social Link Badge</h5>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Platform</label>
            <select class="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200" onchange={handleSocialPlatformChange}>
              <option value="GitHub">GitHub</option>
              <option value="Twitter/X">Twitter / X</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Email">Email</option>
              <option value="Discord">Discord</option>
              <option value="Website">Portfolio Website</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Platform Color</label>
            <input type="text" class="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs font-mono" placeholder="Hex color (e.g. 181717)" bind:value={newSocial.color} />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Display Text / Username</label>
            <input type="text" class="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="e.g. user_dev" bind:value={newSocial.username} />
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Destination URL</label>
            <input type="text" class="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="e.g. https://github.com/..." bind:value={newSocial.url} onkeydown={(e) => e.key === 'Enter' && addSocial()} />
          </div>
        </div>
        <button class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center justify-center transition" onclick={addSocial}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add Social Badge
        </button>
      </div>
    </div>

  <!-- 14. FAQ WIDGET -->
  {:else}
  {#if section.type === 'faq'}
    <div class="space-y-3">
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Collapsible Accordion Questions</label>
      
      <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
        {#each section.content.items as item, idx}
          <div class="bg-slate-950 p-2.5 rounded border border-slate-800/80 flex items-start space-x-2 text-xs relative">
            <button class="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition" onclick={() => removeFaq(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
            <div class="flex-1 space-y-1">
              <span class="font-bold text-slate-200 pr-5 block">❓ {item.question}</span>
              <p class="text-[11px] text-slate-400 leading-relaxed pr-5">{item.answer}</p>
            </div>
          </div>
        {/each}
      </div>

      <!-- Add FAQ Question Form -->
      <div class="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-2 text-xs">
        <h5 class="text-xs font-semibold text-slate-300">Add FAQ Question Block</h5>
        <input type="text" class="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Question Text?" bind:value={newFaqItem.question} />
        <textarea rows="2" class="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Evocative answer explaining detail." bind:value={newFaqItem.answer} onkeydown={(e) => e.key === 'Enter' && !e.shiftKey && addFaq()}></textarea>
        <button class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center justify-center transition" onclick={addFaq}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add Accordion Question
        </button>
      </div>
    </div>

  <!-- 15. ROADMAP WIDGET -->
  {:else}
  {#if section.type === 'roadmap'}
    <div class="space-y-3">
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Roadmap Checklist</label>
      
      <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {#each section.content.items as item, idx}
          <div class="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800/80 text-xs">
            <input type="checkbox" class="rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950" bind:checked={item.completed} />
            <input type="text" class="flex-1 bg-transparent border-none p-0 text-xs text-slate-200 focus:outline-none focus:ring-0 font-medium {item.completed ? 'line-through text-slate-500' : ''}" bind:value={item.text} />
            <button class="text-slate-500 hover:text-red-400 transition" onclick={() => removeRoadmap(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        {/each}
      </div>

      <!-- Add Roadmap Item -->
      <div class="flex space-x-2">
        <input type="text" class="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 text-xs" placeholder="e.g. Integrate artificial intelligence section helpers" bind:value={newRoadmapItem.text} onkeydown={(e) => e.key === 'Enter' && addRoadmap()} />
        <button class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium flex items-center transition" onclick={addRoadmap}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add
        </button>
      </div>
    </div>

  <!-- 16. DEMO WIDGET -->
  {:else}
  {#if section.type === 'demo-links'}
    <div class="space-y-3">
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Demo / Deployment Links</label>
      
      <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {#each section.content.items as item, idx}
          <div class="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800/80 text-xs">
            <span class="text-xs text-indigo-400 font-bold w-4">🔗</span>
            <input type="text" class="bg-transparent border-none p-0 text-xs font-bold text-slate-200 focus:outline-none focus:ring-0 w-24 truncate" bind:value={item.label} />
            <input type="text" class="flex-1 bg-transparent border-none p-0 text-xs text-slate-400 focus:outline-none focus:ring-0 truncate" bind:value={item.url} />
            <button class="text-slate-500 hover:text-red-400 transition" onclick={() => removeDemoLink(idx)}>
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        {/each}
      </div>

      <!-- Add Link Form -->
      <div class="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-2 text-xs">
        <h5 class="text-xs font-semibold text-slate-300">Add Live Link URL</h5>
        <div class="grid grid-cols-2 gap-2">
          <input type="text" class="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="Link Label (e.g. 🚀 Live Demo)" bind:value={newDemoLink.label} />
          <input type="text" class="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs" placeholder="URL Address (e.g. https://...)" bind:value={newDemoLink.url} onkeydown={(e) => e.key === 'Enter' && addDemoLink()} />
        </div>
        <button class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center justify-center transition" onclick={addDemoLink}>
          <Plus class="w-3.5 h-3.5 mr-1" /> Add Link
        </button>
      </div>
    </div>

  <!-- 17. TABLE OF CONTENTS WIDGET -->
  {:else}
  {#if section.type === 'toc'}
    <div class="space-y-3 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
      <div class="flex items-start space-x-2.5">
        <HelpCircle class="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <h4 class="text-xs font-bold text-slate-200">Table of Contents</h4>
          <p class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            This module dynamically scans all active headings in your README builder (e.g., Installation, Usage, Features) and outputs a list of standard markdown anchor links in real time!
          </p>
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="toc-depth">TOC Max Depth</label>
        <select id="toc-depth" class="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md focus:outline-none text-xs text-white" bind:value={section.content.maxDepth}>
          <option value={2}>Heading Level 2 (## Sections)</option>
          <option value={3}>Heading Level 3 (### Sub-headings)</option>
        </select>
      </div>
    </div>

  <!-- 18. CUSTOM MARKDOWN WIDGET -->
  {:else}
  {#if section.type === 'custom-markdown'}
    <div>
      <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1" for="custom-md-text">Custom Markdown / HTML Block</label>
      <textarea id="custom-md-text" rows="7" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-indigo-500 font-mono text-xs text-indigo-100" bind:value={section.content.markdown}></textarea>
    </div>
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
  {/if}
</div>
