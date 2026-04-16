import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { loadConfig } from "../config/load-config.js";
import { compileProject } from "../compiler/compile-project.js";
import { buildCoverageJson } from "../coverage/build-coverage-json.js";
import { buildCoverageHtml } from "../coverage/build-coverage-html.js";

export async function runCoverage(options: { cwd?: string; format?: "json" | "html"; output?: string } = {}): Promise<void> {
  const cwd = resolve(options.cwd ?? process.cwd());
  const config = await loadConfig(cwd);
  const compiled = await compileProject(cwd, config);
  const coverage = buildCoverageJson(compiled.manifest);
  const format = options.format ?? "json";

  if (format === "html") {
    const output = options.output ?? "coverage.html";
    await writeFile(resolve(cwd, output), buildCoverageHtml(coverage), "utf8");
    return;
  }

  const output = options.output ?? "coverage.json";
  await writeFile(resolve(cwd, output), `${JSON.stringify(coverage, null, 2)}\n`, "utf8");
}

