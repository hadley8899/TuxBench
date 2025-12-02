<script lang="ts">
  import { onMount } from 'svelte';
  import { addRun, runs } from './lib/stores/benchmarks';
  import type { BenchmarkRunInput } from './lib/types';

  let mangoHudDetected: boolean | null = null;
  let form: BenchmarkRunInput = {
    name: '',
    command: '',
    notes: '',
  };

  onMount(async () => {
    mangoHudDetected = await window.tuxbenchApi.checkMangoHud();
  });

  const submit = () => {
    if (!form.name || !form.command) return;
    addRun({ ...form }, Boolean(mangoHudDetected));
    form = { name: '', command: '', notes: '' };
  };
</script>

<main class="mx-auto max-w-5xl px-6 py-10">
  <header class="mb-8 flex items-center justify-between">
    <div>
      <p class="text-xs uppercase tracking-[0.35em] text-sky-300">Linux only</p>
      <h1 class="text-3xl font-bold text-white">TuxBench</h1>
      <p class="text-slate-300">A friendly Linux game benchmarking companion powered by MangoHud.</p>
    </div>
    <div
      class={`rounded-full px-4 py-2 text-sm font-semibold ${
        mangoHudDetected === null
          ? 'bg-slate-700 text-slate-200'
          : mangoHudDetected
            ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/60'
            : 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/60'
      }`}
    >
      {#if mangoHudDetected === null}
        Checking MangoHud...
      {:else if mangoHudDetected}
        MangoHud detected
      {:else}
        MangoHud not found
      {/if}
    </div>
  </header>

  <section class="grid gap-6 md:grid-cols-3">
    <div class="md:col-span-2 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-lg">
      <h2 class="mb-4 text-xl font-semibold text-white">New benchmark</h2>
      <form class="space-y-4" on:submit|preventDefault={submit}>
        <div>
          <label class="block text-sm font-medium text-slate-200" for="game-name">Game name</label>
          <input
            id="game-name"
            class="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 focus:border-sky-400 focus:outline-none"
            placeholder="Example: Cyberpunk 2077"
            bind:value={form.name}
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-200" for="launch-command">Launch command</label>
          <input
            id="launch-command"
            class="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 focus:border-sky-400 focus:outline-none"
            placeholder="steam -applaunch 1888930"
            bind:value={form.command}
          />
          <p class="mt-1 text-xs text-slate-400">Use the exact command you would run in a terminal.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-200" for="notes">Notes</label>
          <textarea
            id="notes"
            class="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 focus:border-sky-400 focus:outline-none"
            placeholder="Graphics preset, resolution, or other reminders"
            bind:value={form.notes}
            rows={3}
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-xs text-slate-400">
            MangoHud is required for FPS logging. TuxBench will enable MangoHud logging for each run.
          </div>
          <button
            class="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!mangoHudDetected}
          >
            Start benchmark
          </button>
        </div>
      </form>
    </div>

    <div class="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-lg">
      <h2 class="mb-3 text-xl font-semibold text-white">Quick tips</h2>
      <ul class="space-y-2 text-sm text-slate-300">
        <li>Ensure MangoHud is installed and available in your PATH.</li>
        <li>Use Steam's <code class="rounded bg-slate-800 px-1">-applaunch</code> commands or your native game binaries.</li>
        <li>TuxBench stores runs locally on Linux in <code class="rounded bg-slate-800 px-1">~/.local/share/tuxbench</code>.</li>
      </ul>
    </div>
  </section>

  <section class="mt-10 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-lg">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-white">Recent runs</h2>
      <span class="text-sm text-slate-400">Temporary in-memory list for early demo</span>
    </div>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      {#if $runs.length === 0}
        <p class="text-slate-400">No runs yet. Add a game above to start.</p>
      {:else}
        {#each $runs as run (run.id)}
          <div class="rounded-xl border border-slate-800 bg-slate-800/50 p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-white">{run.name}</h3>
              <span class="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">
                {new Date(run.createdAt).toLocaleString()}
              </span>
            </div>
            <p class="mt-2 text-sm text-slate-300">{run.notes || 'No notes yet'}</p>
            <p class="mt-2 text-xs text-slate-400">Command: <code class="bg-slate-900 px-1">{run.command}</code></p>
            <p class="mt-2 text-xs font-semibold text-slate-200">
              MangoHud {run.mangoHudAvailable ? 'ready' : 'not detected'} when queued
            </p>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</main>
