import { describe, it, expect } from "vitest";
import { parseLocalizationFile } from "../src/parser/parse-localization-file.js";
import { extractPlaceholders } from "../src/parser/extract-placeholders.js";

describe("parser", () => {
  it("extracts placeholders", () => {
    expect(extractPlaceholders("Hi {name}, you have {count}"))
      .toEqual(["count", "name"]);
  });

  it("parses metadata node", () => {
    const parsed = parseLocalizationFile({
      label: {
        "@value": "User",
        "@description": "Desc"
      }
    });
    expect(parsed.label).toBeTypeOf("object");
  });
});

