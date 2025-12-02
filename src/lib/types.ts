export interface BenchmarkRunInput {
  name: string;
  command: string;
  notes?: string;
}

export interface BenchmarkRun extends BenchmarkRunInput {
  id: string;
  createdAt: string;
  mangoHudAvailable: boolean;
}

export interface MangoHudLogFrame {
  timestamp: number;
  fps: number;
  frametimeMs: number;
}

export interface FpsMetrics {
  avg: number;
  min: number;
  max: number;
  p1: number;
  p0_1: number;
}
