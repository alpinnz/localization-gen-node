import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  localStorageStrategy,
  sessionStorageStrategy,
  cookieStrategy,
  memoryStrategy,
  composeStorage
} from "../src/storage/locale-storage.js";

// ─── helpers ──────────────────────────────────────────────────────────────────

const MANIFEST = {
  base_locale: "en",
  fallback_locale: "en",
  locales: ["en", "id", "ja"],
  entries: [],
  messages: { en: {}, id: {}, ja: {} }
};

/** Uses Storage.clear() provided by our setup mock. */
function clearWebStorage(s: Storage) {
  s.clear();
}

// ─── localStorage ─────────────────────────────────────────────────────────────

describe("localStorageStrategy", () => {
  beforeEach(() => clearWebStorage(window.localStorage));
  afterEach(() => clearWebStorage(window.localStorage));

  it("returns undefined when nothing stored", () => {
    const s = localStorageStrategy();
    expect(s.get()).toBeUndefined();
  });

  it("persists and reads back locale", () => {
    const s = localStorageStrategy();
    s.set("id");
    expect(s.get()).toBe("id");
  });

  it("uses custom key", () => {
    const s = localStorageStrategy({ key: "app_locale" });
    s.set("ja");
    expect(localStorage.getItem("app_locale")).toBe("ja");
    expect(s.get()).toBe("ja");
  });

  it("removes locale", () => {
    const s = localStorageStrategy();
    s.set("id");
    s.remove?.();
    expect(s.get()).toBeUndefined();
  });

  it("multiple instances with different keys are independent", () => {
    const a = localStorageStrategy({ key: "lang_a" });
    const b = localStorageStrategy({ key: "lang_b" });
    a.set("en");
    b.set("id");
    expect(a.get()).toBe("en");
    expect(b.get()).toBe("id");
  });
});

// ─── sessionStorage ───────────────────────────────────────────────────────────

describe("sessionStorageStrategy", () => {
  beforeEach(() => clearWebStorage(window.sessionStorage));
  afterEach(() => clearWebStorage(window.sessionStorage));

  it("returns undefined when nothing stored", () => {
    expect(sessionStorageStrategy().get()).toBeUndefined();
  });

  it("persists and reads back locale", () => {
    const s = sessionStorageStrategy();
    s.set("id");
    expect(s.get()).toBe("id");
  });

  it("uses custom key", () => {
    const s = sessionStorageStrategy({ key: "sess_locale" });
    s.set("ja");
    expect(sessionStorage.getItem("sess_locale")).toBe("ja");
  });

  it("removes locale", () => {
    const s = sessionStorageStrategy();
    s.set("en");
    s.remove?.();
    expect(s.get()).toBeUndefined();
  });
});

// ─── cookieStrategy ───────────────────────────────────────────────────────────

describe("cookieStrategy", () => {
  beforeEach(() => {
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      const name = c.trim().split("=")[0];
      document.cookie = `${name}=; max-age=0; path=/`;
    });
  });

  it("returns undefined when no cookie set", () => {
    expect(cookieStrategy({ key: "fresh_locale" }).get()).toBeUndefined();
  });

  it("writes and reads back locale", () => {
    const s = cookieStrategy({ key: "locale_test" });
    s.set("id");
    expect(s.get()).toBe("id");
  });

  it("overwrites existing value", () => {
    const s = cookieStrategy({ key: "locale_ow" });
    s.set("en");
    s.set("ja");
    expect(s.get()).toBe("ja");
  });

  it("remove() makes the value unreadable", () => {
    const s = cookieStrategy({ key: "locale_rm" });
    s.set("id");
    s.remove?.();
    expect(s.get()).toBeUndefined();
  });

  it("handles special characters in locale value via encode/decode", () => {
    const s = cookieStrategy({ key: "locale_enc" });
    s.set("zh-Hant-TW");
    expect(s.get()).toBe("zh-Hant-TW");
  });
});

// ─── memoryStrategy ───────────────────────────────────────────────────────────

describe("memoryStrategy", () => {
  it("returns undefined by default", () => {
    expect(memoryStrategy().get()).toBeUndefined();
  });

  it("accepts initialLocale", () => {
    expect(memoryStrategy({ initialLocale: "id" }).get()).toBe("id");
  });

  it("set and get", () => {
    const s = memoryStrategy();
    s.set("ja");
    expect(s.get()).toBe("ja");
  });

  it("remove clears value", () => {
    const s = memoryStrategy({ initialLocale: "id" });
    s.remove?.();
    expect(s.get()).toBeUndefined();
  });

  it("instances are independent", () => {
    const a = memoryStrategy();
    const b = memoryStrategy();
    a.set("en");
    b.set("id");
    expect(a.get()).toBe("en");
    expect(b.get()).toBe("id");
  });
});

// ─── composeStorage ───────────────────────────────────────────────────────────

describe("composeStorage", () => {
  beforeEach(() => {
    clearWebStorage(window.localStorage);
    clearWebStorage(window.sessionStorage);
  });

  it("reads from the first strategy that has a value", () => {
    const primary = memoryStrategy({ initialLocale: "id" });
    const fallback = memoryStrategy({ initialLocale: "en" });
    const s = composeStorage(primary, fallback);
    expect(s.get()).toBe("id");
  });

  it("falls back to second when primary is empty", () => {
    const primary = memoryStrategy();
    const fallback = memoryStrategy({ initialLocale: "en" });
    const s = composeStorage(primary, fallback);
    expect(s.get()).toBe("en");
  });

  it("returns undefined when all strategies are empty", () => {
    const s = composeStorage(memoryStrategy(), memoryStrategy());
    expect(s.get()).toBeUndefined();
  });

  it("writes to ALL strategies", () => {
    const a = memoryStrategy();
    const b = memoryStrategy();
    const s = composeStorage(a, b);
    s.set("ja");
    expect(a.get()).toBe("ja");
    expect(b.get()).toBe("ja");
  });

  it("remove() is called on all strategies", () => {
    const a = memoryStrategy({ initialLocale: "en" });
    const b = memoryStrategy({ initialLocale: "id" });
    const s = composeStorage(a, b);
    s.remove?.();
    expect(a.get()).toBeUndefined();
    expect(b.get()).toBeUndefined();
  });

  it("cookie + localStorage compose — cookie takes priority", () => {
    const cookie = cookieStrategy({ key: "cl_locale" });
    const ls = localStorageStrategy({ key: "cl_locale_ls" });
    const s = composeStorage(cookie, ls);

    ls.set("en");
    cookie.set("id");
    expect(s.get()).toBe("id");    // cookie wins
  });

  it("cookie + localStorage compose — localStorage fallback when cookie absent", () => {
    const cookie = cookieStrategy({ key: "cl2_locale" });
    const ls = localStorageStrategy({ key: "cl2_locale_ls" });
    const s = composeStorage(cookie, ls);

    ls.set("ja");
    expect(s.get()).toBe("ja");   // falls back to ls
  });
});

// ─── LocalizationProvider integration ────────────────────────────────────────

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import LocalizationProvider, { useLocalization } from "../src/index.js";
import React from "react";

function LocaleSwitcher() {
  const { locale, setLocale, manifest } = useLocalization();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      {manifest.locales.map((l) => (
        <button key={l} onClick={() => setLocale(l)}>{l}</button>
      ))}
    </div>
  );
}

describe("LocalizationProvider + storage integration", () => {
  beforeEach(() => {
    clearWebStorage(window.localStorage);
    clearWebStorage(window.sessionStorage);
  });
  afterEach(() => cleanup());

  it("reads initial locale from storage on mount", () => {
    const storage = memoryStrategy({ initialLocale: "id" });
    render(
      <LocalizationProvider manifest={MANIFEST} storage={storage}>
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("id");
  });

  it("ignores storage value when locale not in manifest.locales", () => {
    const storage = memoryStrategy({ initialLocale: "xx" }); // unknown locale
    render(
      <LocalizationProvider manifest={MANIFEST} storage={storage} initialLocale="id">
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    // Falls back to initialLocale since "xx" is not valid
    expect(screen.getByTestId("locale").textContent).toBe("id");
  });

  it("falls back to initialLocale when storage is empty", () => {
    const storage = memoryStrategy();
    render(
      <LocalizationProvider manifest={MANIFEST} storage={storage} initialLocale="ja">
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("ja");
  });

  it("persists locale to storage when setLocale is called", () => {
    const storage = memoryStrategy();
    render(
      <LocalizationProvider manifest={MANIFEST} storage={storage}>
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    fireEvent.click(screen.getByText("id"));
    expect(storage.get()).toBe("id");
    expect(screen.getByTestId("locale").textContent).toBe("id");
  });

  it("works without storage prop (backwards compat)", () => {
    render(
      <LocalizationProvider manifest={MANIFEST} initialLocale="ja">
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("ja");
  });

  it("localStorage strategy persists across remounts", () => {
    const storage = localStorageStrategy({ key: "test_locale_persist" });
    storage.set("id");

    const { unmount } = render(
      <LocalizationProvider manifest={MANIFEST} storage={storage}>
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("id");
    unmount();

    // Remount — should still read "id" from localStorage
    render(
      <LocalizationProvider manifest={MANIFEST} storage={storage}>
        <LocaleSwitcher />
      </LocalizationProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("id");
  });
});

