import { useMemo } from "react";
import { useLocalization } from "./useLocalization.js";

/**
 * Splits a fully-qualified key into relative path segments by dropping module prefix.
 */
function toSegments(key: string): string[] {
  return key.split(".").slice(1); // strip module prefix
}

/**
 * Builds a nested object API from manifest entries for ergonomic app consumption.
 *
 * @remarks
 * - Non-placeholder entries resolve to strings.
 * - Placeholder entries resolve to functions accepting interpolation params.
 * - This helper is useful for apps that prefer object navigation over flat keys.
 */
export function useAppLocalization() {
  const { store, manifest } = useLocalization();

  return useMemo(() => {
    const strings: Record<string, unknown> = {};
    const placeholders: Record<string, unknown> = {};

    for (const entry of manifest.entries) {
      const segments = toSegments(entry.key);
      if (segments.length === 0) {
        continue;
      }
      const target = entry.placeholders.length > 0 ? placeholders : strings;

      let cursor = target as Record<string, unknown>;
      for (let i = 0; i < segments.length - 1; i += 1) {
        const segment = segments[i];
        if (!segment) {
          continue;
        }
        cursor[segment] ??= {};
        cursor = cursor[segment] as Record<string, unknown>;
      }

      const leaf = segments[segments.length - 1];
      if (!leaf) {
        continue;
      }
      if (entry.placeholders.length > 0) {
        cursor[leaf] = (params: Record<string, string | number>) => store.t(entry.key, params);
      } else {
        cursor[leaf] = store.t(entry.key);
      }
    }

    return {
      strings,
      simple: strings,
      placeholders
    };
  }, [store, manifest]);
}
