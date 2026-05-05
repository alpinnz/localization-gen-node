import { describe, it, expect } from "vitest";
import { createNestLocalizationStore } from "../src/bridge/create-nest-localization-store.js";

describe("nest adapter", () => {
  it("switches locale and returns translated string", () => {
    const store = createNestLocalizationStore({
      base_locale: "en",
      fallback_locale: "en",
      locales: ["en", "id"],
      entries: [
        { key: "common.simple.hello", placeholders: [] }
      ],
      messages: {
        en: { "common.simple.hello": "Hello" },
        id: { "common.simple.hello": "Halo" }
      }
    });

    expect(store.t("common.simple.hello")).toBe("Hello");
    store.setLocale("id");
    expect(store.t("common.simple.hello")).toBe("Halo");
  });

  it("returns key when translation is not found", () => {
    const store = createNestLocalizationStore({
      base_locale: "en",
      fallback_locale: "en",
      locales: ["en"],
      entries: [],
      messages: {
        en: {}
      }
    });

    expect(store.t("common.missing_key")).toBe("common.missing_key");
  });

  it("interpolates placeholder params", () => {
    const store = createNestLocalizationStore({
      base_locale: "en",
      fallback_locale: "en",
      locales: ["en"],
      entries: [{ key: "common.welcome", placeholders: ["name"] }],
      messages: {
        en: { "common.welcome": "Welcome, {name}!" }
      }
    });

    expect(store.t("common.welcome", { name: "Alfin" })).toBe("Welcome, Alfin!");
  });
});

