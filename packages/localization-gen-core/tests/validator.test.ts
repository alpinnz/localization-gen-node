import { describe, it, expect } from "vitest";
import { validateMaxDepth } from "../src/validator/validate-max-depth.js";

describe("validator", () => {
  it("flags max depth violations", () => {
    const diagnostics = validateMaxDepth(
      {
        locales: ["en"],
        modules: ["common"],
        entries: [
          {
            module: "common",
            locale: "en",
            messages: {
              "a.b.c": {
                key: "a.b.c",
                sourceKey: "a.b.c",
                module: "common",
                locale: "en",
                value: "x",
                placeholders: []
              }
            }
          }
        ]
      },
      2
    );
    expect(diagnostics.length).toBe(1);
  });
});

