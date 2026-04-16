import type { Diagnostic } from "../types/diagnostics.js";
import type { NormalizedProject } from "../types/normalized.js";

export function validatePathConsistency(project: NormalizedProject): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  for (const entry of project.entries) {
    for (const message of Object.values(entry.messages)) {
      const metadataLocale = message.metadata?.custom?.locale;
      const metadataModule = message.metadata?.custom?.module;
      if (typeof metadataLocale === "string" && metadataLocale !== message.locale) {
        diagnostics.push({
          code: "PATH_METADATA_LOCALE_MISMATCH",
          severity: "error",
          message: `Metadata locale ${metadataLocale} does not match file locale ${message.locale}`,
          key: message.key
        });
      }
      if (typeof metadataModule === "string" && metadataModule !== message.module) {
        diagnostics.push({
          code: "PATH_METADATA_MODULE_MISMATCH",
          severity: "error",
          message: `Metadata module ${metadataModule} does not match file module ${message.module}`,
          key: message.key
        });
      }
    }
  }
  return diagnostics;
}

