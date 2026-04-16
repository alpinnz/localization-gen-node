import { join } from "node:path";
import type { LocalizationGenConfig } from "../types/config.js";
import type { NormalizedLocaleModule, NormalizedProject } from "../types/normalized.js";
import { buildFileIndex } from "../loader/build-file-index.js";
import { readJsonFile } from "../loader/read-json-file.js";
import { parseLocalizationFile } from "../parser/parse-localization-file.js";
import { flattenKeys } from "./flatten-keys.js";
import { normalizeKeyNode } from "./normalize-key-node.js";
import { normalizeMetadata } from "./normalize-metadata.js";
import { normalizeStructuredNode } from "./normalize-structured-node.js";

export async function normalizeProject(cwd: string, config: LocalizationGenConfig): Promise<NormalizedProject> {
  const entries: NormalizedLocaleModule[] = [];
  const index = await buildFileIndex(cwd, join(cwd, config.input_dir));

  for (const file of index) {
    const raw = await readJsonFile(file.filePath);
    const parsed = parseLocalizationFile(raw);
    const flat = flattenKeys(parsed);
    const messages = Object.fromEntries(
      flat.map((leaf) => {
        const normalized = normalizeKeyNode(leaf, file.module, file.locale);
        normalized.metadata = normalizeMetadata(normalized.metadata);
        normalized.structured = normalizeStructuredNode(normalized.structured);
        return [normalized.key, normalized];
      })
    );

    entries.push({
      module: file.module,
      locale: file.locale,
      messages
    });
  }

  const locales = [...new Set(entries.map((entry) => entry.locale))].sort();
  const modules = [...new Set(entries.map((entry) => entry.module))].sort();

  return { locales, modules, entries };
}

