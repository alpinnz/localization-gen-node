import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { scanLocalizationFiles } from "../src/loader/scan-localization-files.js";
import { resolveModuleLocale } from "../src/loader/resolve-module-locale.js";

describe("loader", () => {
  it("scans fixture files", async () => {
    const root = resolve(process.cwd(), "assets/localizations");
    const files = await scanLocalizationFiles(root);
    expect(files.length).toBeGreaterThan(0);
  });

  it("resolves module and locale from path", () => {
    const parsed = resolveModuleLocale("/tmp/common/en.json");
    expect(parsed).toEqual({ module: "common", locale: "en" });
  });
});

