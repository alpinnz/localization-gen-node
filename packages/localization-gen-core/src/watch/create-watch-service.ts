import chokidar from "chokidar";
import { join } from "node:path";
import type { LocalizationGenConfig } from "../types/config.js";
import { DEFAULT_WATCH_IGNORE_PATTERNS } from "./ignore-patterns.js";
import { handleFileChange } from "./handle-file-change.js";

export function createWatchService(cwd: string, config: LocalizationGenConfig, runGenerate: () => Promise<void>): () => Promise<void> {
  const watcher = chokidar.watch(join(cwd, config.input_dir), {
    ignored: DEFAULT_WATCH_IGNORE_PATTERNS,
    ignoreInitial: true
  });

  watcher.on("add", async () => handleFileChange(runGenerate));
  watcher.on("change", async () => handleFileChange(runGenerate));
  watcher.on("unlink", async () => handleFileChange(runGenerate));

  return async () => watcher.close();
}

