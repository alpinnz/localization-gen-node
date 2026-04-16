import { describe, it, expect } from "vitest";
import { buildManifest } from "../src/compiler/build-manifest.js";
import { DEFAULT_CONFIG } from "../src/config/defaults.js";

describe("compiler", () => {
  it("builds manifest from normalized project", () => {
    const manifest = buildManifest(
      {
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
                placeholders: []
              }
            }
          }
        ]
      },
      DEFAULT_CONFIG
    );
    expect(manifest.entries[0]?.key).toBe("common.simple.hello");
  });
});

