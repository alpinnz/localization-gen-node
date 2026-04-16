import { resolve } from "node:path";
import { loadConfig } from "../config/load-config.js";
import { cleanOutput } from "../emitter/clean-output.js";

export async function runClean(options: { cwd?: string } = {}): Promise<void> {
  const cwd = resolve(options.cwd ?? process.cwd());
  const config = await loadConfig(cwd);
  await cleanOutput(cwd, config);
}

