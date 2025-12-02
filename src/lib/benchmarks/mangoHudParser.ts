import type { MangoHudLogFrame } from '../types';

export const parseMangoHudCsv = (csvContent: string): MangoHudLogFrame[] => {
  const lines = csvContent
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const frames: MangoHudLogFrame[] = [];

  for (const line of lines.slice(1)) {
    const [timestampStr, fpsStr, frametimeStr] = line.split(',').map((value) => value.trim());
    if (!timestampStr || !fpsStr || !frametimeStr) continue;

    const timestamp = Number(timestampStr);
    const fps = Number(fpsStr);
    const frametimeMs = Number(frametimeStr);

    if (Number.isFinite(timestamp) && Number.isFinite(fps) && Number.isFinite(frametimeMs)) {
      frames.push({ timestamp, fps, frametimeMs });
    }
  }

  return frames;
};
