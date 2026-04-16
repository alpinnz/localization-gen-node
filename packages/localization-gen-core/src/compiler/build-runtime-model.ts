import type { RuntimeManifest } from "../types/manifest.js";

export interface RuntimeModel {
  stringsTree: Record<string, unknown>;
  placeholderFns: string[];
}

function setNested(target: Record<string, unknown>, path: string[], value: unknown): void {
  if (path.length === 0) {
    return;
  }
  let cursor: Record<string, unknown> = target;
  for (let i = 0; i < path.length - 1; i += 1) {
    const segment = path[i];
    if (!segment) {
      continue;
    }
    const next = cursor[segment];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      cursor[segment] = {};
    }
    cursor = cursor[segment] as Record<string, unknown>;
  }
  const leaf = path[path.length - 1];
  if (!leaf) {
    return;
  }
  cursor[leaf] = value;
}

/**
 * Builds the accessor tree used in the generated `appLocalization` constant.
 * Property names always match source key segments as-is (snake_case preserved).
 */
export function buildRuntimeModel(manifest: RuntimeManifest): RuntimeModel {
  const stringsTree: Record<string, unknown> = {};
  const placeholderFns: string[] = [];

  for (const entry of manifest.entries) {
    // Strip module prefix for accessor path; leaf stays the original full message key.
    const segments = entry.key
      .split(".")
      .slice(1); // remove module prefix

    setNested(stringsTree, segments, entry.key);

    if (entry.placeholders.length > 0) {
      placeholderFns.push(entry.key);
    }
  }

  return { stringsTree, placeholderFns: placeholderFns.sort() };
}
