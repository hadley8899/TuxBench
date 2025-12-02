import type { BenchmarkRun, BenchmarkRunInput } from '../types';

export interface BenchmarkSession {
  id: string;
  run: BenchmarkRun;
  startedAt: number;
  stoppedAt?: number;
}

export const createSessionRecord = (
  input: BenchmarkRunInput,
  mangohudAvailable: boolean
): BenchmarkSession => {
  const run: BenchmarkRun = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    mangoHudAvailable: mangohudAvailable,
  };

  return {
    id: run.id,
    run,
    startedAt: Date.now(),
  };
};

export const stopSessionRecord = (session: BenchmarkSession): BenchmarkSession => ({
  ...session,
  stoppedAt: Date.now(),
});
