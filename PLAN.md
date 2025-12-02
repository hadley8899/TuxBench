# TuxBench implementation plan

## Phase 1: Project scaffolding
- Electron + Vite + Svelte TypeScript baseline with secure preload bridge
- Tailwind styling primitives and basic layout shell
- Dummy new benchmark form with in-memory run list
- MangoHud presence check surfaced in UI

## Phase 2: MangoHud logging integration
- Generate per-session MangoHud config enabling CSV logging
- Launch user commands with MangoHud env vars and capture session metadata
- Parse MangoHud CSV output into structured frame time series

## Phase 3: System stats and storage
- Poll CPU/RAM via `systeminformation` and GPU via `nvidia-smi` (Nvidia-first)
- Persist runs to `~/.local/share/tuxbench/sessions/<id>.json` with metadata, system snapshot, and raw series
- Render run detail views with charts for FPS/time and frametimes

## Phase 4: Reports and comparison
- Export HTML and CSV reports per session (self-contained charts for HTML)
- Compare 2–4 runs with shared metrics table and optional normalized overlay charts
- Settings surface for log directory, polling intervals, and GPU tooling paths
