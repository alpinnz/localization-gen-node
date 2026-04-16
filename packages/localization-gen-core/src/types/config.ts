export type Framework = "react" | "vue";

export interface GeneratedConfig {
  runtime_entry_file: string;
  runtime_types_file: string;
  runtime_manifest_file: string;
}

export interface ValidationConfig {
  max_depth: number;
  require_key_parity: boolean;
  require_placeholder_parity: boolean;
  require_structured_parity: boolean;
  allow_custom_metadata: boolean;
  validate_path_metadata_consistency: boolean;
}

export interface ReportingConfig {
  output_dir: string;
  coverage_format: "json" | "html";
}

export interface LocalizationGenConfig {
  input_dir: string;
  output_dir: string;
  framework: Framework;
  class_name: string;
  base_locale: string;
  fallback_locale: string;
  strict: boolean;
  generated: GeneratedConfig;
  validation: ValidationConfig;
  reporting: ReportingConfig;
}

