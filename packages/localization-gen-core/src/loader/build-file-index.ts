import { relative } from "node:path";
import { scanLocalizationFiles } from "./scan-localization-files.js";
import { resolveModuleLocale } from "./resolve-module-locale.js";

export interface LocalizationFileIndexEntry {
  filePath: string;
  relativePath: string;
  module: string;
  locale: string;
}

export async function buildFileIndex(cwd: string, inputDir: string, ext = "json"): Promise<LocalizationFileIndexEntry[]> {
  const files = await scanLocalizationFiles(inputDir, ext);
  return files.map((filePath) => {
    const resolved = resolveModuleLocale(filePath);
    return {
      filePath,
      relativePath: relative(cwd, filePath),
      ...resolved
    };
  });
}

