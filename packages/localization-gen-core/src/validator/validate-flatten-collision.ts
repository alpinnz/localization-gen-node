import type { Diagnostic } from "../types/diagnostics.js";
import type { NormalizedProject } from "../types/normalized.js";

export function validateFlattenCollision(project: NormalizedProject): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const entry of project.entries) {
    const seen = new Map<string, string>();
    for (const message of Object.values(entry.messages)) {
      const previous = seen.get(message.key);
      if (previous && previous !== message.sourceKey) {
        diagnostics.push({
          code: "FLATTEN_COLLISION",
          severity: "error",
          message: `Flatten collision: ${previous} and ${message.sourceKey} both map to ${message.key}`,
          key: message.key
        });
      }
      seen.set(message.key, message.sourceKey);
    }
  }

  return diagnostics;
}

