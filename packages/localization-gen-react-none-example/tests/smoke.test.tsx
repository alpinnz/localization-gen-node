import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import manifest from "../src/assets/localizations/app-localization";

function readJson(relativePath: string) {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8"));
}

describe("react example localization assets", () => {
  it("contains detailed auth/home/settings examples", () => {
    const authEn = readJson("../assets/localizations/auth/en.json");
    const homeEn = readJson("../assets/localizations/home/en.json");
    const settingsEn = readJson("../assets/localizations/settings/en.json");

    expect(authEn.placeholders.welcome_back["@value"]).toContain("{name}");
    expect(homeEn.structured.notifications["@plural"].other).toContain("{count}");
    expect(settingsEn.structured.backup_status["@context"].synced).toBeTruthy();
  });
});

describe("react example generated output", () => {
  it("contains merged keys from all modules", () => {
    expect(manifest.messages.en["common.app_title"]).toBe("App");
    expect(manifest.messages.en["auth.placeholders.welcome_back"]).toContain("{name}");
    expect(manifest.messages.en["auth.consent.privacy_policy"]).toContain("Introduction");
    expect(manifest.messages.en["home.structured.notifications"]).toContain("{count} new notifications");
    expect(manifest.messages.en["settings.structured.backup_status"]).toContain("Backup is up to date");
    expect(manifest.messages.en["http.http_404_title"]).toBe("Not Found");
    expect(manifest.messages.en["fallback.fb500_h"]).toBe("Technical Issue");
  });
});
