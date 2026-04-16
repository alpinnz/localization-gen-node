import { describe, it, expect } from "vitest";
import { flattenKeys } from "../src/normalizer/flatten-keys.js";

describe("normalizer", () => {
  it("flattens nested keys", () => {
    const flattened = flattenKeys({
      parent: { child: "value" }
    });
    expect(flattened[0]?.key).toBe("parent.child");
  });
});

