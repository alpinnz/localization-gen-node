import type { Diagnostic } from "../types/diagnostics.js";
import type { NormalizedProject } from "../types/normalized.js";

export function validateMaxDepth(project: NormalizedProject, maxDepth: number): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  for (const entry of project.entries) {
    for (const message of Object.values(entry.messages)) {
      const depth = message.sourceKey.split(".").length;
      if (depth > maxDepth) {
        diagnostics.push({
          code: "MAX_DEPTH_EXCEEDED",
          severity: "error",
          message: `Key ${message.sourceKey} exceeds max depth ${maxDepth}`,
          key: message.key
        });
      }
    }
  }
  return diagnostics;
}

