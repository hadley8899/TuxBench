import type { FpsMetrics } from '../types';

export interface BenchmarkReport {
  title: string;
  summary: FpsMetrics;
  notes?: string;
}

export const renderHtmlReport = (report: BenchmarkReport): string => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${report.title}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; }
      h1 { color: #0f172a; }
      table { border-collapse: collapse; }
      td { padding: 4px 12px; }
    </style>
  </head>
  <body>
    <h1>${report.title}</h1>
    <p>${report.notes ?? ''}</p>
    <table>
      <tbody>
        <tr><td>Average FPS</td><td>${report.summary.avg.toFixed(2)}</td></tr>
        <tr><td>Min FPS</td><td>${report.summary.min.toFixed(2)}</td></tr>
        <tr><td>Max FPS</td><td>${report.summary.max.toFixed(2)}</td></tr>
        <tr><td>1% Low</td><td>${report.summary.p1.toFixed(2)}</td></tr>
        <tr><td>0.1% Low</td><td>${report.summary.p0_1.toFixed(2)}</td></tr>
      </tbody>
    </table>
  </body>
</html>
`;
