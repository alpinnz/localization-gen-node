import { describe, it, expect } from "vitest";
import { interpolate, lookupMessage } from "../src/runtime/index.js";

describe("runtime", () => {
  it("interpolates placeholders", () => {
    expect(interpolate("Hello {name}", { name: "Alfin" })).toBe("Hello Alfin");
  });

  it("falls back locale for missing key", () => {
    const value = lookupMessage(
      {
        locale: "id",
        fallbackLocale: "en",
        messages: {
          en: { "common.simple.hello": "Hello" },
          id: {}
        }
      },
      "common.simple.hello"
    );
    expect(value).toBe("Hello");
  });
});

