<script lang="ts">
  import { onMount } from 'svelte';
  import { X, Send, GitBranch, AlertTriangle, FileCode, CheckCircle, ExternalLink, RefreshCw } from 'lucide-svelte';

  // Props in Svelte 5
  let {
    isOpen = $bindable(false),
    owner = '',
    repo = '',
    branch = 'main',
    newMarkdown = '',
    originalMarkdown = ''
  } = $props<{
    isOpen: boolean;
    owner: string;
    repo: string;
    branch: string;
    newMarkdown: string;
    originalMarkdown: string;
  }>();

  // State in Svelte 5
  let commitMessage = $state('docs: update README.md using README Builder');
  let targetBranch = $state(branch);
  let isSubmitting = $state(false);
  let commitResult = $state<{ success: boolean; commitSha?: string; htmlUrl?: string; message?: string } | null>(null);

  // Synchronize targetBranch when branch prop updates
  $effect(() => {
    targetBranch = branch;
  });

  // Calculate high level diff stats
  const diffStats = $derived.by(() => {
    const origLines = originalMarkdown ? originalMarkdown.split('\n').length : 0;
    const newLines = newMarkdown ? newMarkdown.split('\n').length : 0;
    
    return {
      originalLines: origLines,
      newLines: newLines,
      changePercent: origLines > 0 ? Math.round(((newLines - origLines) / origLines) * 100) : 100
    };
  });

  // Execute the commit fetch operation
  async function handleCommit() {
    isSubmitting = true;
    commitResult = null;

    try {
      const response = await fetch('/api/github/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          owner,
          repo,
          markdown: newMarkdown,
          commitMessage,
          branch: targetBranch
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        commitResult = {
          success: true,
          commitSha: result.commitSha,
          htmlUrl: result.htmlUrl
        };
      } else {
        commitResult = {
          success: false,
          message: result.message || 'An error occurred during committing.'
        };
      }
    } catch (err: unknown) {
      console.error('Commit failed:', err);
      commitResult = {
        success: false,
        message: err instanceof Error ? err.message : 'Network error occurred. Please try again.'
      };
    } finally {
      isSubmitting = false;
    }
  }

  function handleClose() {
    isOpen = false;
    commitResult = null;
    commitMessage = 'docs: update README.md using README Builder';
  }
</script>

{#if isOpen}
  <!-- sliding side drawer container -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end" onclick={handleClose}>
    
    <!-- Drawer panel -->
    <div 
      class="w-full max-w-xl bg-[#0c111e]/95 border-l border-slate-800/80 h-full flex flex-col shadow-2xl overflow-hidden glass-panel"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Drawer Header -->
      <div class="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none bg-slate-950/20">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileCode class="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-white">Commit to GitHub</h3>
            <p class="text-[10px] text-slate-400 font-medium">Push README.md directly to {owner}/{repo}</p>
          </div>
        </div>
        <button class="p-1.5 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-white transition" onclick={handleClose}>
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Drawer Body -->
      <div class="flex-1 overflow-y-auto p-5 space-y-5">
        
        {#if commitResult}
          {#if commitResult.success}
            <!-- Success Pane -->
            <div class="p-6 bg-emerald-950/30 border border-emerald-900/40 rounded-2xl text-center space-y-4 py-10">
              <div class="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle class="w-6 h-6" />
              </div>
              <div class="space-y-1.5">
                <h4 class="text-sm font-bold text-white">README.md Committed Successfully!</h4>
                <p class="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Your README.md file has been updated and pushed directly to the target branch.
                </p>
              </div>
              <div class="flex flex-col gap-2 pt-2 max-w-sm mx-auto">
                <a 
                  href={commitResult.htmlUrl} 
                  target="_blank" 
                  class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <span>View File on GitHub</span>
                  <ExternalLink class="w-3.5 h-3.5" />
                </a>
                <button 
                  class="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition"
                  onclick={handleClose}
                >
                  Back to Workspace
                </button>
              </div>
            </div>
          {:else}
            <!-- Error Pane -->
            <div class="p-5 bg-red-950/30 border border-red-900/40 rounded-2xl space-y-3">
              <div class="flex items-center space-x-2 text-red-400">
                <AlertTriangle class="w-5 h-5 shrink-0" />
                <h4 class="text-xs font-bold">Commit Operations Failed</h4>
              </div>
              <p class="text-[11px] text-red-300/80 leading-relaxed font-mono bg-red-950/40 p-3 rounded border border-red-900/30">
                {commitResult.message}
              </p>
              <button 
                class="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition"
                onclick={() => commitResult = null}
              >
                Try Again
              </button>
            </div>
          {/if}
        {:else}
          <!-- Configuration Form -->
          <div class="space-y-4">
            
            <!-- Commit Inputs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1" for="commit-branch">Target Branch</label>
                <div class="relative">
                  <GitBranch class="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
                  <input 
                    id="commit-branch"
                    type="text" 
                    class="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono transition" 
                    bind:value={targetBranch} 
                  />
                </div>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1" for="commit-file-path">File Path</label>
                <input 
                  id="commit-file-path"
                  type="text" 
                  class="w-full px-3 py-1.5 bg-slate-950/60 border border-slate-850 text-slate-400 rounded-lg text-xs font-mono select-none" 
                  value="README.md"
                  readonly 
                />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1" for="commit-msg">Commit Message</label>
              <input 
                id="commit-msg"
                type="text" 
                class="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition font-medium" 
                bind:value={commitMessage} 
              />
            </div>

            <!-- Overwrite warning if original markdown existed -->
            {#if originalMarkdown}
              <div class="p-3 bg-amber-950/40 border border-amber-900/40 rounded-xl flex items-start space-x-2.5">
                <AlertTriangle class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 class="text-xs font-bold text-amber-400">File Overwrite Warning</h4>
                  <p class="text-[10px] text-slate-400 leading-normal mt-0.5">
                    A `README.md` file already exists in branch `<b>{targetBranch}</b>`. Pushing this commit will replace its current contents entirely.
                  </p>
                </div>
              </div>
            {/if}

            <!-- Diff Metrics Header -->
            <div class="space-y-1.5 pt-2">
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Workspace Diff Statistics</label>
              <div class="grid grid-cols-3 gap-2 p-3 bg-slate-950/40 border border-slate-850 rounded-xl text-center">
                <div>
                  <span class="block text-xs font-mono text-slate-400">{diffStats.originalLines}</span>
                  <span class="text-[9px] text-slate-500">Original Lines</span>
                </div>
                <div>
                  <span class="block text-xs font-mono text-indigo-400">{diffStats.newLines}</span>
                  <span class="text-[9px] text-slate-500">Generated Lines</span>
                </div>
                <div>
                  <span class="block text-xs font-mono {diffStats.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                    {diffStats.changePercent >= 0 ? '+' : ''}{diffStats.changePercent}%
                  </span>
                  <span class="text-[9px] text-slate-500">Change Volume</span>
                </div>
              </div>
            </div>

            <!-- Diff Preview Panel -->
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Commit Preview</label>
              <div class="border border-slate-850 rounded-xl h-64 overflow-y-auto bg-[#0d1117] font-mono text-[10.5px] p-4 text-slate-300 leading-relaxed whitespace-pre select-text">
                {#if originalMarkdown}
                  <!-- Simple snippet view comparison -->
                  <div class="text-[9px] text-slate-500 border-b border-slate-850 pb-1 mb-2 font-sans select-none">
                    --- CURRENT COMPILATION PREVIEW ---
                  </div>
                {/if}
                {newMarkdown}
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex items-center space-x-2 pt-2">
              <button 
                class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
                onclick={handleCommit}
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <RefreshCw class="w-3.5 h-3.5 animate-spin" />
                  <span>Committing changes...</span>
                {:else}
                  <Send class="w-3.5 h-3.5" />
                  <span>Commit to GitHub</span>
                {/if}
              </button>
              <button 
                class="py-2.5 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition"
                onclick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>

          </div>
        {/if}

      </div>
    </div>

  </div>
{/if}
