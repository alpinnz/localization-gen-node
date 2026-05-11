import { describe, it, expect } from "vitest";
import { buildManifest } from "../src/compiler/build-manifest.js";
import { DEFAULT_CONFIG } from "../src/config/defaults.js";

const FIXTURE_PROJECT = {
  locales: ["en"],
  modules: ["common"],
  entries: [
    {
      module: "common",
      locale: "en",
      messages: {
        "simple.hello": {
          key: "simple.hello",
          sourceKey: "simple.hello",
          module: "common",
          locale: "en",
          value: "Hello",
          placeholders: [] as string[]
        }
      }
    }
  ]
};

describe("compiler", () => {
  it("builds manifest from normalized project", () => {
    const manifest = buildManifest(FIXTURE_PROJECT, DEFAULT_CONFIG);
    expect(manifest.entries[0]?.key).toBe("common.simple.hello");
  });

  it("namespace_prefix: module prepends module name to key", () => {
    const manifest = buildManifest(FIXTURE_PROJECT, {
      ...DEFAULT_CONFIG,
      namespace_prefix: "module"
    });
    expect(manifest.entries[0]?.key).toBe("common.simple.hello");
    expect(manifest.messages["en"]?.["common.simple.hello"]).toBe("Hello");
  });

  it("namespace_prefix: none omits module name from key", () => {
    const manifest = buildManifest(FIXTURE_PROJECT, {
      ...DEFAULT_CONFIG,
      namespace_prefix: "none"
    });
    expect(manifest.entries[0]?.key).toBe("simple.hello");
    expect(manifest.messages["en"]?.["simple.hello"]).toBe("Hello");
  });
});

