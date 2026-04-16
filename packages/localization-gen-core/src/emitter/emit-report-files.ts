import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { LocalizationGenConfig } from "../types/config.js";
import type { CompiledProject } from "../compiler/compile-project.js";
import { buildCoverageJson } from "../coverage/build-coverage-json.js";

export async function emitReportFiles(cwd: string, config: LocalizationGenConfig, compiled: CompiledProject): Promise<void> {
  const reportDir = join(cwd, config.reporting.output_dir);
  const coverage = buildCoverageJson(compiled.manifest);
  await writeFile(join(reportDir, "coverage.json"), `${JSON.stringify(coverage, null, 2)}\n`, "utf8");
  await writeFile(join(reportDir, "diagnostics.json"), `${JSON.stringify(compiled.diagnostics, null, 2)}\n`, "utf8");
  await writeFile(join(reportDir, "placeholders.json"), `${JSON.stringify(compiled.placeholders, null, 2)}\n`, "utf8");
}

