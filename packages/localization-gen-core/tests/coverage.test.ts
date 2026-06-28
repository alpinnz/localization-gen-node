import { describe, it, expect } from "vitest";
import { buildCoverageJson } from "../src/coverage-build/build-coverage-json.js";
import { buildCoverageHtml } from "../src/coverage-build/build-coverage-html.js";
import type { RuntimeManifest } from "../src/types/manifest.js";

function makeManifest(partial: Partial<RuntimeManifest> = {}): RuntimeManifest {
  return {
    base_locale: "en",
    fallback_locale: "en",
    locales: ["en", "id"],
    entries: [
      { key: "auth.login.title", placeholders: [] },
      { key: "auth.login.submit", placeholders: [] },
      { key: "home.hero.headline", placeholders: ["name"] }
    ],
    messages: {
      en: {
        "auth.login.title": "Sign in",
        "auth.login.submit": "Continue"
        // "home.hero.headline" intentionally missing from en
      },
      id: {
        "auth.login.title": "Masuk",
        "auth.login.submit": "Lanjutkan",
        "home.hero.headline": "Halo {name}"
      }
    },
    ...partial
  };
}

describe("coverage", () => {
  it("buildCoverageJson counts totals and per-locale coverage", () => {
    const report = buildCoverageJson(makeManifest());
    expect(report.totals.locales).toBe(2);
    expect(report.totals.keys).toBe(3);
    expect(report.totals.modules).toBe(2); // auth, home
    expect(report.byLocale.en).toEqual({ keys: 2 });
    expect(report.byLocale.id).toEqual({ keys: 3 });
  });

  it("buildCoverageJson uses _root when keys have no dotted segment", () => {
    const report = buildCoverageJson(
      makeManifest({
        entries: [{ key: "title", placeholders: [] }],
        messages: { en: { title: "Title" }, id: { title: "Judul" } }
      })
    );
    expect(report.totals.modules).toBe(1);
    expect(report.totals.keys).toBe(1);
    expect(report.byLocale.en.keys).toBe(1);
  });

  it("buildCoverageJson handles empty manifest", () => {
    const report = buildCoverageJson({
      base_locale: "en",
      fallback_locale: "en",
      locales: [],
      entries: [],
      messages: {}
    });
    expect(report.totals).toEqual({ locales: 0, modules: 0, keys: 0 });
    expect(report.byLocale).toEqual({});
  });

  it("buildCoverageHtml renders locale rows with coverage percentage", () => {
    const report = buildCoverageJson(makeManifest());
    const html = buildCoverageHtml(report);
    expect(html).toContain("<!doctype html>");
    expect(html).toContain("Localization coverage");
    expect(html).toContain("<td>en</td>");
    expect(html).toContain("<td>id</td>");
    expect(html).toContain("66.7%"); // 2/3 for en
    expect(html).toContain("100.0%"); // 3/3 for id
    // Critical: no raw locale strings injected into attribute or markup context
    expect(html).not.toContain("&lt;script");
  });

  it("buildCoverageHtml escapes hostile locale labels", () => {
    const html = buildCoverageHtml({
      totals: { locales: 1, modules: 1, keys: 1 },
      byLocale: {
        "<script>alert(1)</script>": { keys: 1 }
      }
    });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
