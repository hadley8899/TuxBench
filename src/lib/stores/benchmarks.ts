import { writable } from 'svelte/store';
import type { BenchmarkRun, BenchmarkRunInput } from '../types';
import { createSessionRecord } from '../benchmarks/sessionManager';

const initialRuns: BenchmarkRun[] = [
  {
    id: crypto.randomUUID(),
    name: 'Example Game',
    command: 'steam -applaunch 123456',
    notes: 'Ultra preset for smoke test',
    createdAt: new Date().toISOString(),
    mangoHudAvailable: true,
  },
];

export const runs = writable<BenchmarkRun[]>(initialRuns);

export const addRun = (input: BenchmarkRunInput, mangoHudAvailable: boolean) => {
  const session = createSessionRecord(input, mangoHudAvailable);
  runs.update((current) => [session.run, ...current]);
};
