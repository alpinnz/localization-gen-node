import { resolve } from "node:path";
import { loadConfig } from "../config/load-config.js";
import { compileProject } from "../compiler/compile-project.js";
import { emitRuntimeFiles } from "../emitter/emit-runtime-files.js";
import { emitReportFiles } from "../emitter/emit-report-files.js";
import { ensureOutputDirs } from "../emitter/ensure-output-dirs.js";
import { createWatchService } from "../watch/create-watch-service.js";

export async function runGenerate(options: { cwd?: string; watch?: boolean } = {}): Promise<void> {
  const cwd = resolve(options.cwd ?? process.cwd());
  const config = await loadConfig(cwd);

  const generateOnce = async (): Promise<void> => {
    await ensureOutputDirs(cwd, config);
    const compiled = await compileProject(cwd, config);
    await emitRuntimeFiles(cwd, config, compiled);
    await emitReportFiles(cwd, config, compiled);
    if (compiled.diagnostics.some((d) => d.severity === "error") && config.strict) {
      throw new Error("Localization generation failed with diagnostics.");
    }
  };

  await generateOnce();

  if (options.watch) {
    await createWatchService(cwd, config, generateOnce);
    // Keep process alive for watch mode.
    await new Promise(() => undefined);
  }
}

