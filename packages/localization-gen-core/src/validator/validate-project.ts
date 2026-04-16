import type { LocalizationGenConfig } from "../types/config.js";
import type { Diagnostic } from "../types/diagnostics.js";
import type { NormalizedProject } from "../types/normalized.js";
import { validateFlattenCollision } from "./validate-flatten-collision.js";
import { validateKeyParity } from "./validate-key-parity.js";
import { validateMaxDepth } from "./validate-max-depth.js";
import { validateMetadataUsage } from "./validate-metadata-usage.js";
import { validatePathConsistency } from "./validate-path-consistency.js";
import { validatePlaceholderParity } from "./validate-placeholder-parity.js";
import { validateStructuredParity } from "./validate-structured-parity.js";

export function validateProject(project: NormalizedProject, config: LocalizationGenConfig): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  diagnostics.push(...validateFlattenCollision(project));
  diagnostics.push(...validateMaxDepth(project, config.validation.max_depth));
  diagnostics.push(...validateMetadataUsage(project));

  if (config.validation.validate_path_metadata_consistency) {
    diagnostics.push(...validatePathConsistency(project));
  }
  if (config.validation.require_key_parity) {
    diagnostics.push(...validateKeyParity(project));
  }
  if (config.validation.require_placeholder_parity) {
    diagnostics.push(...validatePlaceholderParity(project));
  }
  if (config.validation.require_structured_parity) {
    diagnostics.push(...validateStructuredParity(project));
  }

  return diagnostics;
}

