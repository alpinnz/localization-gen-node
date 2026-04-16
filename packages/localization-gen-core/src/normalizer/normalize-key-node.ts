import { extractPlaceholders } from "../parser/extract-placeholders.js";
import type { FlattenedLeaf } from "./flatten-keys.js";
import type { NormalizedMessage } from "../types/normalized.js";

export function normalizeKeyNode(
  leaf: FlattenedLeaf,
  module: string,
  locale: string
): NormalizedMessage {
  // Key is always the original snake_case path from the source file.
  const key = leaf.key;
  const value = leaf.leaf.value;
  return {
    key,
    sourceKey: leaf.sourceKey,
    module,
    locale,
    value,
    metadata: leaf.leaf.metadata,
    structured: leaf.leaf.structured,
    placeholders: extractPlaceholders(value)
  };
}



