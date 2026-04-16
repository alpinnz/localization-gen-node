import { describe, it, expect } from "vitest";
import { createReactLocalizationStore } from "../src/bridge/create-react-localization-store.js";

describe("react adapter", () => {
  it("switches locale and returns translated string", () => {
    const store = createReactLocalizationStore({
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
    const store = createReactLocalizationStore({
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
});

