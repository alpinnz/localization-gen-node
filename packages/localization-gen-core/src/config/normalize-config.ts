import { DEFAULT_CONFIG } from "./defaults.js";
import type { LocalizationGenConfig } from "../types/config.js";

export function normalizeConfig(rawConfig: Partial<LocalizationGenConfig>): LocalizationGenConfig {
  return {
    ...DEFAULT_CONFIG,
    ...rawConfig,
    generated: {
      ...DEFAULT_CONFIG.generated,
      ...rawConfig.generated
    },
    validation: {
      ...DEFAULT_CONFIG.validation,
      ...rawConfig.validation
    },
    reporting: {
      ...DEFAULT_CONFIG.reporting,
      ...rawConfig.reporting
    }
  };
}

