import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { LocalizationGenConfig } from "../types/config.js";

export async function ensureOutputDirs(cwd: string, config: LocalizationGenConfig): Promise<void> {
  await mkdir(join(cwd, config.output_dir), { recursive: true });
  await mkdir(join(cwd, config.reporting.output_dir), { recursive: true });
  await mkdir(dirname(join(cwd, config.output_dir, config.generated.runtime_entry_file)), { recursive: true });
}

