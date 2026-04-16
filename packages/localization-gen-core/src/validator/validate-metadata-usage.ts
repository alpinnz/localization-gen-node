import type { Diagnostic } from "../types/diagnostics.js";
import type { NormalizedProject } from "../types/normalized.js";

export function validateMetadataUsage(project: NormalizedProject): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const entry of project.entries) {
    for (const message of Object.values(entry.messages)) {
      const value = message.value ?? "";
      if ((message.metadata || message.structured) && value.length === 0 && !message.structured) {
        diagnostics.push({
          code: "VALUE_REQUIRED_WITH_METADATA",
          severity: "error",
          message: `Key ${message.sourceKey} uses metadata but is missing @value`,
          key: message.key
        });
      }
    }
  }

  return diagnostics;
}

