import type { FpsMetrics } from '../types';

const percentile = (values: number[], percentileValue: number): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.max(Math.ceil(percentileValue * sorted.length) - 1, 0);
  return sorted[index];
};

export const calculateFpsMetrics = (fpsValues: number[]): FpsMetrics => {
  if (fpsValues.length === 0) {
    return { avg: 0, min: 0, max: 0, p1: 0, p0_1: 0 };
  }

  const total = fpsValues.reduce((acc, value) => acc + value, 0);
  const avg = total / fpsValues.length;
  const min = Math.min(...fpsValues);
  const max = Math.max(...fpsValues);

  return {
    avg,
    min,
    max,
    p1: percentile(fpsValues, 0.01),
    p0_1: percentile(fpsValues, 0.001),
  };
};
