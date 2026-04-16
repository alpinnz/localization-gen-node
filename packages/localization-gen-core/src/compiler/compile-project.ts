import type { LocalizationGenConfig } from "../types/config.js";
import type { RuntimeManifest } from "../types/manifest.js";
import { normalizeProject } from "../normalizer/normalize-project.js";
import { validateProject } from "../validator/validate-project.js";
import { buildManifest } from "./build-manifest.js";
import { buildReactRuntimeFiles } from "./build-react-runtime-files.js";
import { buildVueRuntimeFiles } from "./build-vue-runtime-files.js";

export interface CompiledProject {
  manifest: RuntimeManifest;
  runtimeEntryFile: string;
  runtimeTypesFile: string;
  diagnostics: ReturnType<typeof validateProject>;
  placeholders: Record<string, string[]>;
}

export async function compileProject(cwd: string, config: LocalizationGenConfig): Promise<CompiledProject> {
  const normalized = await normalizeProject(cwd, config);
  const diagnostics = validateProject(normalized, config);
  const manifest = buildManifest(normalized, config);

  const files = config.framework === "react" ? buildReactRuntimeFiles(manifest) : buildVueRuntimeFiles(manifest);

  const placeholders = Object.fromEntries(
    manifest.entries
      .filter((entry) => entry.placeholders.length > 0)
      .map((entry): [string, string[]] => [entry.key, entry.placeholders])
      .sort(([a], [b]) => a.localeCompare(b))
  );

  return {
    manifest,
    runtimeEntryFile: files.entry,
    runtimeTypesFile: files.types,
    diagnostics,
    placeholders
  };
}

