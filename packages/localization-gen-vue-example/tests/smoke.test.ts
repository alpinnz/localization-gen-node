import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

function readJson(relativePath: string) {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8"));
}

describe("vue example localization assets", () => {
  it("contains detailed auth/home/settings examples", () => {
    const authId = readJson("../assets/localizations/auth/id.json");
    const homeId = readJson("../assets/localizations/home/id.json");
    const settingsId = readJson("../assets/localizations/settings/id.json");

    expect(authId.placeholders.welcome_back["@value"]).toContain("{name}");
    expect(homeId.structured.notifications["@plural"].other).toContain("{count}");
    expect(settingsId.structured.backup_status["@context"].synced).toBeTruthy();
  });
});
