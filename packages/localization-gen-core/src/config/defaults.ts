import type { LocalizationGenConfig } from "../types/config.js";

export const DEFAULT_CONFIG: LocalizationGenConfig = {
  input_dir: "assets/localizations",
  output_dir: "src/assets/localizations",
  framework: "react",
  class_name: "AppLocalizations",
  base_locale: "en",
  fallback_locale: "en",
  strict: true,
  namespace_prefix: "module",
  generated: {
    runtime_entry_file: "app-localization.ts",
    runtime_types_file: "app-localization.types.ts",
    runtime_manifest_file: "app-localization.manifest.json"
  },
  validation: {
    max_depth: 6,
    require_key_parity: true,
    require_placeholder_parity: true,
    require_structured_parity: true,
    allow_custom_metadata: true,
    validate_path_metadata_consistency: true
  },
  reporting: {
    output_dir: "src/assets/localizations/reports",
    coverage_format: "json"
  }
};

