import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { LocalizationGenConfig } from "../types/config.js";
import type { CompiledProject } from "../compiler/compile-project.js";

export async function emitRuntimeFiles(cwd: string, config: LocalizationGenConfig, compiled: CompiledProject): Promise<void> {
  await writeFile(join(cwd, config.output_dir, config.generated.runtime_entry_file), compiled.runtimeEntryFile, "utf8");
  await writeFile(join(cwd, config.output_dir, config.generated.runtime_types_file), compiled.runtimeTypesFile, "utf8");
  await writeFile(
    join(cwd, config.output_dir, config.generated.runtime_manifest_file),
    `${JSON.stringify(compiled.manifest, null, 2)}\n`,
    "utf8"
  );
}

