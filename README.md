# TuxBench

TuxBench is a Linux-only desktop benchmarking companion that leans on MangoHud logging to capture FPS and frametime data from your games. The goal is to keep benchmarking approachable for non-technical players while offering transparent, hackable internals for power users.

## Project status

The project is in early scaffolding. The UI currently supports a dummy benchmark form, in-memory runs, and MangoHud availability detection. Logging, parsing, reporting, and comparison flows are being built next.

## Requirements

- Linux (x86_64) desktop
- Node.js 20+
- [MangoHud](https://github.com/flightlessmango/MangoHud) available on your `PATH`
- For Nvidia GPU telemetry in future milestones: `nvidia-smi` available on `PATH`

## Development

```bash
npm install
npm run dev
```

The `dev` script starts the Vite dev server for the Svelte renderer and spawns Electron (using `ts-node`) once the renderer is ready.

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

Build emits the renderer bundle to `dist/` and compiles the Electron main/preload scripts to `build/electron/`.

## MangoHud integration approach

TuxBench assumes MangoHud is already installed. At runtime we:

1. **Detect MangoHud** by running `which mangohud`. If the binary is not found, the UI surfaces a friendly warning and disables benchmarking until it is available.
2. **Generate per-session MangoHud config** enabling logging to a known directory (default: `~/.local/share/tuxbench/logs`).
3. **Launch games with MangoHud** by prefixing the user-provided command with MangoHud and required environment variables for logging.
4. **Parse MangoHud CSV logs** to extract FPS/frametime series for aggregation (avg/min/max/1%/0.1% low) stored alongside system stats.

TuxBench never attempts to install MangoHud automatically and will always respect user-provided launch commands. Future work will add AMD/Nvidia-specific GPU polling, but MangoHud remains the primary FPS source.

## Repository layout

```
root/
├── electron/           # Electron main & preload processes
├── src/                # Renderer (Svelte + Vite)
│   └── lib/benchmarks  # Benchmark utilities (parsers, stats, stubs)
├── data/               # Runtime storage (placeholder)
├── README.md
└── PLAN.md
```

## Roadmap

See [PLAN.md](./PLAN.md) for milestone breakdowns.
