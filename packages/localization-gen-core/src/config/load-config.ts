import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import YAML from "yaml";
import type { LocalizationGenConfig } from "../types/config.js";
import { normalizeConfig } from "./normalize-config.js";
import { validateConfig } from "./validate-config.js";

export async function loadConfig(cwd: string): Promise<LocalizationGenConfig> {
  const configPath = resolve(cwd, "localization-gen.yaml");
  const raw = await readFile(configPath, "utf8");
  const parsed = YAML.parse(raw) as Partial<LocalizationGenConfig> & {
    file_extension?: unknown;
    field_rename?: unknown;
  };
  if (parsed.file_extension !== undefined) {
    throw new Error("Config validation failed: file_extension is no longer supported. Use .json localization files.");
  }
  if (parsed.field_rename !== undefined) {
    throw new Error("Config validation failed: field_rename is no longer supported. Rename mode is fixed to none.");
  }
  const normalized = normalizeConfig(parsed);
  validateConfig(normalized);
  return normalized;
}

