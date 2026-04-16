import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { scanLocalizationFiles } from "../src/loader/scan-localization-files.js";
import { parseModuleLocale } from "../src/loader/parse-module-locale.js";

describe("loader", () => {
  it("scans fixture files", async () => {
    const root = resolve(process.cwd(), "assets/localizations");
    const files = await scanLocalizationFiles(root);
    expect(files.length).toBeGreaterThan(0);
  });

  it("parses module and locale from path", () => {
    const parsed = parseModuleLocale("/tmp/common/en.json");
    expect(parsed).toEqual({ module: "common", locale: "en" });
  });
});

