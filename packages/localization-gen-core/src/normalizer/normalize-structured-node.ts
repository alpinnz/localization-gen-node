import type { StructuredNode } from "../types/ast.js";

export function normalizeStructuredNode(node: StructuredNode | undefined): StructuredNode | undefined {
  if (!node) {
    return undefined;
  }
  const variants = Object.fromEntries(Object.entries(node.variants).sort(([a], [b]) => a.localeCompare(b)));
  return {
    ...node,
    variants
  };
}

