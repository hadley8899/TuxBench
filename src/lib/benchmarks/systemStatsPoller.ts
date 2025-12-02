export interface SystemStatPoint {
  timestamp: number;
  cpuUsage?: number;
  memoryUsedGb?: number;
  gpuUtilization?: number;
  vramUsedGb?: number;
}

export type StatsSubscriber = (point: SystemStatPoint) => void;

export class SystemStatsPoller {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly subscribers: Set<StatsSubscriber> = new Set();

  constructor(private readonly intervalMs: number = 1000) {}

  start(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      const point: SystemStatPoint = {
        timestamp: Date.now(),
      };
      this.subscribers.forEach((subscriber) => subscriber(point));
    }, this.intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(subscriber: StatsSubscriber): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }
}
