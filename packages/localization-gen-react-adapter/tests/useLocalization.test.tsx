import React, { PropsWithChildren } from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, act, cleanup } from "@testing-library/react";
import LocalizationProvider from "../src/provider/LocalizationProvider.js";
import { useLocalization } from "../src/hooks/useLocalization.js";
import type { RuntimeManifest } from "localization-gen-core/runtime";

afterEach(cleanup);

// ─── Shared manifest fixture ──────────────────────────────────────────────────

const manifest: RuntimeManifest = {
  base_locale: "en",
  fallback_locale: "en",
  locales: ["en", "id"],
  entries: [
    { key: "greeting", placeholders: [] },
    { key: "items_count", placeholders: [] },
    { key: "welcome", placeholders: ["name"] }
  ],
  messages: {
    en: {
      greeting: "Hello",
      items_count: '{"one":"1 item","other":"{count} items"}',
      welcome: "Welcome, {name}!"
    },
    id: {
      greeting: "Halo",
      items_count: '{"one":"1 item","other":"{count} item"}',
      welcome: "Selamat datang, {name}!"
    }
  }
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function Wrapper({ children }: PropsWithChildren) {
  return (
    <LocalizationProvider manifest={manifest} initialLocale="en">
      {children}
    </LocalizationProvider>
  );
}

function getHookResult() {
  let result!: ReturnType<typeof useLocalization>;
  function Consumer() {
    result = useLocalization();
    return null;
  }
  render(<Consumer />, { wrapper: Wrapper });
  return result;
}

// ─── translateOrNull ──────────────────────────────────────────────────────────

describe("translateOrNull", () => {
  it("returns translated string when key exists", () => {
    const { translateOrNull } = getHookResult();
    expect(translateOrNull("greeting")).toBe("Hello");
  });

  it("returns null when key does NOT exist", () => {
    const { translateOrNull } = getHookResult();
    expect(translateOrNull("non.existing.key")).toBeNull();
  });

  it("returns translated string from fallback locale when key missing in current locale", () => {
    const fallbackManifest: RuntimeManifest = {
      ...manifest,
      messages: {
        en: { greeting: "Hello" },
        id: {}
      }
    };

    let result!: ReturnType<typeof useLocalization>;
    function Consumer() {
      result = useLocalization();
      return null;
    }
    render(
      <LocalizationProvider manifest={fallbackManifest} initialLocale="id">
        <Consumer />
      </LocalizationProvider>
    );
    expect(result.translateOrNull("greeting")).toBe("Hello");
  });

  it("returns null when key does not exist in new locale or fallback", () => {
    const { translateOrNull } = getHookResult();
    expect(translateOrNull("greeting")).toBe("Hello");
    expect(translateOrNull("ghost.key")).toBeNull();
  });
});

// ─── formatOrNull ───────────────────────────────────────────────────────────────

describe("formatOrNull", () => {
  it("returns interpolated string when key exists", () => {
    const { formatOrNull } = getHookResult();
    expect(formatOrNull("welcome", { name: "Alice" })).toBe("Welcome, Alice!");
  });

  it("returns null when key does NOT exist", () => {
    const { formatOrNull } = getHookResult();
    expect(formatOrNull("ghost.key", { name: "Alice" })).toBeNull();
  });
});

// ─── pluralOrNull ───────────────────────────────────────────────────────────────

describe("pluralOrNull", () => {
  it("returns singular form when key exists (count=1)", () => {
    const { pluralOrNull } = getHookResult();
    expect(pluralOrNull("items_count", 1)).toBe("1 item");
  });

  it("returns plural form when key exists (count>1)", () => {
    const { pluralOrNull } = getHookResult();
    expect(pluralOrNull("items_count", 5)).toBe("5 items");
  });

  it("returns null when key does NOT exist", () => {
    const { pluralOrNull } = getHookResult();
    expect(pluralOrNull("ghost.plural.key", 3)).toBeNull();
  });
});

// ─── namespace + try* ─────────────────────────────────────────────────────────

describe("namespace — find* variants", () => {
  const nsManifest: RuntimeManifest = {
    base_locale: "en",
    fallback_locale: "en",
    locales: ["en"],
    entries: [
      { key: "dashboard.title", placeholders: [] },
      { key: "dashboard.count", placeholders: [] },
      { key: "dashboard.welcome", placeholders: ["name"] }
    ],
    messages: {
      en: {
        "dashboard.title": "Dashboard",
        "dashboard.count": '{"one":"1 item","other":"{count} items"}',
        "dashboard.welcome": "Hello, {name}!"
      }
    }
  };

  function getNamespace() {
    let ns!: ReturnType<ReturnType<typeof useLocalization>["namespace"]>;
    function Consumer() {
      ns = useLocalization().namespace("dashboard");
      return null;
    }
    render(
      <LocalizationProvider manifest={nsManifest} initialLocale="en">
        <Consumer />
      </LocalizationProvider>
    );
    return ns;
  }

  it("translateOrNull — returns value for existing namespaced key", () => {
    expect(getNamespace().translateOrNull("title")).toBe("Dashboard");
  });

  it("translateOrNull — returns null for missing namespaced key", () => {
    expect(getNamespace().translateOrNull("missing")).toBeNull();
  });

  it("formatOrNull — returns interpolated value for existing key", () => {
    expect(getNamespace().formatOrNull("welcome", { name: "Bob" })).toBe("Hello, Bob!");
  });

  it("formatOrNull — returns null for missing namespaced key", () => {
    expect(getNamespace().formatOrNull("missing", { name: "Bob" })).toBeNull();
  });

  it("pluralOrNull — returns plural value for existing key", () => {
    expect(getNamespace().pluralOrNull("count", 2)).toBe("2 items");
  });

  it("pluralOrNull — returns null for missing namespaced key", () => {
    expect(getNamespace().pluralOrNull("missing", 2)).toBeNull();
  });
});

