import { describe, it, expect } from "vitest";
import { createNestLocalizationStore } from "localization-gen-nest-adapter";

const manifest = {
  base_locale: "en",
  fallback_locale: "en",
  locales: ["en", "id"],
  entries: [
    { key: "common.greeting", placeholders: [] },
    { key: "common.welcome_user", placeholders: ["name"] },
    { key: "api.items_count", placeholders: ["count"] },
    { key: "api.user_role", placeholders: [] },
    { key: "api.user_title", placeholders: ["last_name"] }
  ],
  messages: {
    en: {
      "common.greeting": "Hello",
      "common.welcome_user": "Welcome, {name}!",
      "api.items_count": '{"@plural":{"zero":"No items found","one":"1 item found","other":"{count} items found"}}',
      "api.user_role": '{"@context":{"admin":"Administrator","user":"Regular User","guest":"Guest"}}',
      "api.user_title": '{"@gender":{"male":"Mr. {last_name}","female":"Ms. {last_name}","other":"Mx. {last_name}"}}'
    },
    id: {
      "common.greeting": "Halo",
      "common.welcome_user": "Selamat datang, {name}!",
      "api.items_count": '{"@plural":{"zero":"Tidak ada item","one":"1 item ditemukan","other":"{count} item ditemukan"}}',
      "api.user_role": '{"@context":{"admin":"Administrator","user":"Pengguna Biasa","guest":"Tamu"}}',
      "api.user_title": '{"@gender":{"male":"Bapak {last_name}","female":"Ibu {last_name}","other":"Sdr. {last_name}"}}'
    }
  }
};

describe("nest example smoke test", () => {
  it("translates greeting in English", () => {
    const store = createNestLocalizationStore(manifest);
    expect(store.t("common.greeting")).toBe("Hello");
  });

  it("translates greeting in Indonesian", () => {
    const store = createNestLocalizationStore(manifest, "id");
    expect(store.t("common.greeting")).toBe("Halo");
  });

  it("switches locale dynamically", () => {
    const store = createNestLocalizationStore(manifest);
    expect(store.t("common.greeting")).toBe("Hello");
    store.setLocale("id");
    expect(store.t("common.greeting")).toBe("Halo");
  });

  it("interpolates placeholders", () => {
    const store = createNestLocalizationStore(manifest);
    expect(store.t("common.welcome_user", { name: "Alfin" })).toBe("Welcome, Alfin!");
  });

  it("falls back for missing key", () => {
    const store = createNestLocalizationStore(manifest, "id");
    expect(store.t("common.missing_key")).toBe("common.missing_key");
  });
});

