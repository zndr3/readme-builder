<script lang="ts">
  import { onMount } from 'svelte';
  import { Search, Star, SortAsc, History, GitFork, X, Lock, Globe, Calendar, RefreshCw } from 'lucide-svelte';

  // Props in Svelte 5
  let { 
    isOpen = $bindable(false),
    onSelectRepo
  } = $props<{
    isOpen: boolean;
    onSelectRepo: (repo: { owner: string; name: string; defaultBranch: string }) => void;
  }>();

  // State in Svelte 5
  let repos = $state<any[]>([]);
  let isLoading = $state(false);
  let searchQuery = $state('');
  let sortBy = $state<'updated' | 'stars' | 'name'>('updated');
  let recentRepos = $state<any[]>([]);

  // Load repositories from server API
  async function fetchRepos() {
    isLoading = true;
    try {
      const res = await fetch('/api/github/repos');
      if (res.ok) {
        repos = await res.json();
      } else {
        console.error('Failed to load repos:', res.statusText);
      }
    } catch (e) {
      console.error('Error fetching repos:', e);
    } finally {
      isLoading = false;
    }
  }

  // Load recent repos from localStorage
  function loadRecents() {
    try {
      const stored = localStorage.getItem('readme_builder_recent_repos');
      if (stored) {
        recentRepos = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load recents from localStorage:', e);
    }
  }

  // Add repo to recents in localStorage
  function addToRecents(repo: any) {
    const item = {
      owner: repo.owner,
      name: repo.name,
      fullName: repo.fullName,
      language: repo.language,
      stars: repo.stars,
      defaultBranch: repo.defaultBranch
    };

    // Filter out if already exists, then prepend and slice to max 3
    const filtered = recentRepos.filter(r => r.fullName !== repo.fullName);
    recentRepos = [item, ...filtered].slice(0, 3);
    
    try {
      localStorage.setItem('readme_builder_recent_repos', JSON.stringify(recentRepos));
    } catch (e) {
      console.error('Failed to save recents:', e);
    }
  }

  onMount(() => {
    loadRecents();
    if (isOpen) {
      fetchRepos();
    }
  });

  // Track isOpen change in Svelte 5 with $effect to trigger fetch
  $effect(() => {
    if (isOpen && repos.length === 0) {
      fetchRepos();
    }
  });

  // Derived filter and sort state in Svelte 5
  const filteredRepos = $derived.by(() => {
    let list = [...repos];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(r => 
        r.name.toLowerCase().includes(q) || 
        (r.description && r.description.toLowerCase().includes(q)) ||
        r.language.toLowerCase().includes(q)
      );
    }

    // Sort operations
    list.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stars - a.stars;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // 'updated' default
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return list;
  });

  // Select a repository to scan
  function selectRepo(repo: any) {
    addToRecents(repo);
    onSelectRepo({
      owner: repo.owner,
      name: repo.name,
      defaultBranch: repo.defaultBranch
    });
    isOpen = false;
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

{#if isOpen}
  <!-- Sliding Glassmorphic Modal Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4" onclick={() => isOpen = false}>
    
    <!-- Modal Container -->
    <div class="w-full max-w-2xl bg-[#0c111e]/95 border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden glass-panel" onclick={(e) => e.stopPropagation()}>
      
      <!-- Modal Header -->
      <div class="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none bg-slate-950/20">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <GitFork class="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-white">Import from GitHub</h3>
            <p class="text-[10px] text-slate-400 font-medium">Select a repository to scan and generate your README</p>
          </div>
        </div>
        <button class="p-1.5 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-white transition" onclick={() => isOpen = false}>
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        
        <!-- Recent Repositories Section -->
        {#if recentRepos.length > 0 && !searchQuery}
          <div class="space-y-2">
            <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
              <History class="w-3.5 h-3.5 mr-1" /> Recent Repositories
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {#each recentRepos as repo (repo.fullName)}
                <button 
                  class="p-3 bg-slate-950/50 hover:bg-slate-900 border border-slate-850 rounded-xl text-left transition duration-200 group relative overflow-hidden"
                  onclick={() => selectRepo(repo)}
                >
                  <h5 class="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition truncate">{repo.name}</h5>
                  <p class="text-[10px] text-slate-500 font-mono mt-0.5">{repo.owner}</p>
                  <div class="flex items-center space-x-2 mt-2.5 text-[9px] text-slate-400">
                    <span class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-850">{repo.language}</span>
                    <span class="flex items-center"><Star class="w-3 h-3 text-amber-500 mr-0.5" /> {repo.stars}</span>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Search and Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              class="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500 text-xs text-slate-200 placeholder-slate-500 transition" 
              placeholder="Search repositories..." 
              bind:value={searchQuery} 
            />
          </div>

          <div class="flex items-center space-x-2 shrink-0">
            <SortAsc class="w-4 h-4 text-slate-500" />
            <select 
              class="px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-300 focus:outline-none transition font-medium"
              bind:value={sortBy}
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Alphabetical</option>
            </select>
            
            <button 
              class="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition"
              onclick={fetchRepos}
              title="Refresh repository list"
            >
              <RefreshCw class="w-3.5 h-3.5 {isLoading ? 'animate-spin text-indigo-400' : ''}" />
            </button>
          </div>
        </div>

        <!-- Repository List -->
        <div class="space-y-2">
          <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available Repositories ({filteredRepos.length})</h4>
          
          {#if isLoading}
            <div class="py-16 text-center space-y-3">
              <RefreshCw class="w-7 h-7 animate-spin text-indigo-500 mx-auto" />
              <p class="text-xs text-slate-500 font-medium">Fetching repositories from your account...</p>
            </div>
          {:else}
            <div class="space-y-2.5 max-h-[40vh] overflow-y-auto pr-1">
              {#each filteredRepos as repo (repo.id)}
                <div class="p-3 bg-slate-950/40 border border-slate-850 rounded-xl hover:border-slate-800 flex items-start justify-between gap-4 transition duration-200 hover:bg-slate-900/10">
                  <div class="space-y-1.5 min-w-0">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-bold text-white truncate max-w-xs">{repo.name}</span>
                      
                      <!-- Visibility Pill -->
                      {#if repo.private}
                        <span class="px-1.5 py-0.5 rounded-full bg-red-950/60 border border-red-900/30 text-[9px] font-bold text-red-400 flex items-center space-x-1 shrink-0">
                          <Lock class="w-2.5 h-2.5" />
                          <span>Private</span>
                        </span>
                      {:else}
                        <span class="px-1.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-900/30 text-[9px] font-bold text-indigo-400 flex items-center space-x-1 shrink-0">
                          <Globe class="w-2.5 h-2.5" />
                          <span>Public</span>
                        </span>
                      {/if}
                    </div>

                    <p class="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">{repo.description}</p>
                    
                    <div class="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 pt-0.5">
                      <span class="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-850 font-medium text-slate-400">{repo.language}</span>
                      <span class="flex items-center"><Star class="w-3.5 h-3.5 text-amber-500 mr-0.5 fill-amber-500/10" /> {repo.stars}</span>
                      <span class="flex items-center"><Calendar class="w-3.5 h-3.5 mr-1" /> Updated {formatDate(repo.updatedAt)}</span>
                    </div>
                  </div>

                  <button 
                    class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shrink-0 shadow-md"
                    onclick={() => selectRepo(repo)}
                  >
                    Select
                  </button>
                </div>
              {:else}
                <div class="py-12 border border-dashed border-slate-800 rounded-xl text-center text-slate-500">
                  <GitFork class="w-7 h-7 mx-auto text-slate-600 mb-2.5" />
                  <h4 class="text-xs font-bold text-slate-400">No repositories found</h4>
                  <p class="text-[10px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    {#if searchQuery}
                      We couldn't find any repositories matching "{searchQuery}". Try refining your search.
                    {:else}
                      Your GitHub account doesn't seem to contain any repositories we can list.
                    {/if}
                  </p>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
