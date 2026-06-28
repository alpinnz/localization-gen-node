import type { RuntimeManifest } from "../types/manifest.js";

export interface CoverageByLocale {
  keys: number;
}

export interface CoverageTotals {
  locales: number;
  modules: number;
  keys: number;
}

export interface CoverageReport {
  totals: CoverageTotals;
  byLocale: Record<string, CoverageByLocale>;
}

/**
 * Build a coverage summary from a runtime manifest:
 * - `totals.locales`     — number of distinct locales declared in the manifest.
 * - `totals.modules`      — number of distinct top-level modules (first dotted segment of each key, or `"_root"`).
 * - `totals.keys`         — total number of flattened entries.
 * - `byLocale[locale].keys` — number of entries that have at least one translation
 *   in that locale (i.e. locale key is present in `messages[locale]`).
 *
 * Consumers (CLI `coverage` command and `emit-report-files`) serialize this as
 * `coverage.json` inside the configured reporting output dir.
 */
export function buildCoverageJson(manifest: RuntimeManifest): CoverageReport {
  const modules = new Set<string>();
  for (const entry of manifest.entries) {
    const head = entry.key.split(".", 1)[0];
    modules.add(head && head.length > 0 ? head : "_root");
  }

  const byLocale: Record<string, CoverageByLocale> = {};
  for (const locale of manifest.locales) {
    const messages = manifest.messages[locale] ?? {};
    let covered = 0;
    for (const entry of manifest.entries) {
      if (entry.key in messages) {
        covered += 1;
      }
    }
    byLocale[locale] = { keys: covered };
  }

  return {
    totals: {
      locales: manifest.locales.length,
      modules: modules.size,
      keys: manifest.entries.length
    },
    byLocale
  };
}
