import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { normalizeConfig } from "../src/config/normalize-config.js";
import { compileProject } from "../src/compiler/compile-project.js";

describe("integration", () => {
  it("compiles fixture localization project", async () => {
    const cwd = resolve(process.cwd());
    const config = normalizeConfig({
      input_dir: "assets/localizations",
      output_dir: "src/assets/localizations",
      framework: "react"
    });

    const compiled = await compileProject(cwd, config);
    expect(compiled.manifest.locales).toContain("en");
    expect(compiled.manifest.entries.length).toBeGreaterThan(0);
  });
});

