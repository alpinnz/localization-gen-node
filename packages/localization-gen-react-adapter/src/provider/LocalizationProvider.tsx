import { createContext, useCallback, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import type { RuntimeManifest } from "localization-gen-core";
import { createReactLocalizationStore, type ReactLocalizationStore } from "../bridge/create-react-localization-store.js";
import type { LocaleStorage } from "../storage/locale-storage.js";

/**
 * React context value exposed by `LocalizationProvider`.
 */
export interface LocalizationContextValue {
  /** Active locale currently used for runtime resolution. */
  locale: string;
  /** Updates active locale for all consumers under the provider. */
  setLocale: (locale: string) => void;
  /** Runtime store with `t()` and locale utilities. */
  store: ReactLocalizationStore;
  /** Generated runtime manifest used as source of truth. */
  manifest: RuntimeManifest;
}

export interface LocalizationProviderProps {
  /** Generated runtime manifest from localization-gen output. */
  manifest: RuntimeManifest;
  /**
   * Optional initial locale. When `storage` is also provided the stored value
   * takes precedence over `initialLocale`.
   */
  initialLocale?: string;
  /**
   * Pluggable locale storage strategy.
   *
   * Built-in helpers:
   * - `localStorageStrategy()`   — persists in `window.localStorage`
   * - `sessionStorageStrategy()` — persists in `window.sessionStorage`
   * - `cookieStrategy({ domain, maxAge, … })` — persists as a cookie
   * - `memoryStrategy()`          — in-memory only (no persistence)
   * - `composeStorage(a, b)`      — combines multiple strategies
   *
   * @example
   * // Cookie shared across *.example.com (also readable server-side for SSR)
   * <LocalizationProvider
   *   storage={cookieStrategy({ domain: ".example.com" })}
   *   manifest={manifest}
   * />
   *
   * @example
   * // Cookie first, then localStorage as fallback
   * <LocalizationProvider
   *   storage={composeStorage(cookieStrategy(), localStorageStrategy())}
   *   manifest={manifest}
   * />
   */
  storage?: LocaleStorage;
}

/**
 * Internal React context consumed by `useLocalization`.
 */
export const LocalizationContext = createContext<LocalizationContextValue | null>(null);

/**
 * Resolves the initial locale by checking (in priority order):
 * 1. Value from `storage.get()`
 * 2. Explicitly provided `initialLocale` prop
 * 3. `manifest.base_locale`
 */
function resolveInitialLocale(
  manifest: RuntimeManifest,
  initialLocale?: string,
  storage?: LocaleStorage
): string {
  const stored = storage?.get();
  if (stored && manifest.locales.includes(stored)) return stored;
  if (initialLocale && manifest.locales.includes(initialLocale)) return initialLocale;
  return manifest.base_locale;
}

/**
 * Provides localization state and runtime store to React subtree.
 *
 * Optionally pass a `storage` strategy to persist the selected locale
 * across page reloads (localStorage, sessionStorage, cookie, …).
 *
 * @example
 * // No persistence (default)
 * <LocalizationProvider manifest={manifest}>…</LocalizationProvider>
 *
 * @example
 * // Persist in localStorage
 * import { localStorageStrategy } from "localization-gen-react-adapter";
 * <LocalizationProvider manifest={manifest} storage={localStorageStrategy()}>…</LocalizationProvider>
 *
 * @example
 * // Persist as cookie on .example.com
 * import { cookieStrategy } from "localization-gen-react-adapter";
 * <LocalizationProvider
 *   manifest={manifest}
 *   storage={cookieStrategy({ domain: ".example.com" })}
 * >…</LocalizationProvider>
 */
export default function LocalizationProvider({
  manifest,
  initialLocale,
  storage,
  children
}: PropsWithChildren<LocalizationProviderProps>) {
  const [locale, _setLocale] = useState(() =>
    resolveInitialLocale(manifest, initialLocale, storage)
  );

  /** Wraps the state setter so every locale change is also persisted to `storage`. */
  const setLocale = useCallback(
    (nextLocale: string) => {
      storage?.set(nextLocale);
      _setLocale(nextLocale);
    },
    [storage]
  );

  const value = useMemo(() => {
    const store = createReactLocalizationStore(manifest, locale);
    return {
      locale,
      setLocale,
      store,
      manifest
    };
  }, [locale, manifest, setLocale]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}
