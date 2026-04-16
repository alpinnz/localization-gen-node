import { rm } from "node:fs/promises";
import { join } from "node:path";
import type { LocalizationGenConfig } from "../types/config.js";

export async function cleanOutput(cwd: string, config: LocalizationGenConfig): Promise<void> {
  await rm(join(cwd, config.output_dir), { recursive: true, force: true });
  await rm(join(cwd, config.reporting.output_dir), { recursive: true, force: true });
}

