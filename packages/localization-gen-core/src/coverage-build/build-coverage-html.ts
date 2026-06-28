import type { CoverageReport } from "./build-coverage-json.js";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return ch;
    }
  });
}

/**
 * Render a `CoverageReport` as a self-contained HTML document.
 *
 * Intentionally minimal — no external CSS/JS so the file works opened
 * locally or attached to a CI artifact. Consumers wrap this in
 * `await writeFile(...)` from `runCoverage` in the CLI.
 */
export function buildCoverageHtml(report: CoverageReport): string {
  const locales = Object.keys(report.byLocale);
  const localeRows = locales
    .map((locale) => {
      const entry = report.byLocale[locale] ?? { keys: 0 };
      const ratio = report.totals.keys > 0 ? (entry.keys / report.totals.keys) * 100 : 0;
      return `<tr><td>${escapeHtml(locale)}</td><td>${entry.keys}</td><td>${ratio.toFixed(1)}%</td></tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Localization coverage</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; color: #1f2933; }
    h1 { margin-bottom: 0.25rem; }
    p.summary { color: #52606d; margin-top: 0; }
    table { border-collapse: collapse; margin-top: 1rem; min-width: 320px; }
    th, td { border: 1px solid #cbd2d9; padding: 0.4rem 0.75rem; text-align: left; }
    th { background: #f5f7fa; }
  </style>
</head>
<body>
  <h1>Localization coverage</h1>
  <p class="summary">${report.totals.keys} keys across ${report.totals.modules} modules and ${report.totals.locales} locales.</p>
  <table>
    <thead>
      <tr><th>Locale</th><th>Translated keys</th><th>Coverage</th></tr>
    </thead>
    <tbody>${localeRows}</tbody>
  </table>
</body>
</html>
`;
}
