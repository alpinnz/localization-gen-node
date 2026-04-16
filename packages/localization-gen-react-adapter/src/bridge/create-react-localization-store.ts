import { interpolate, lookupMessage } from "localization-gen-core/runtime";
import type { RuntimeManifest } from "localization-gen-core";

/**
 * Minimal runtime store contract used by React adapter hooks/provider.
 */
export interface ReactLocalizationStore {
  /** Returns current active locale. */
  getLocale(): string;
  /** Updates active locale. */
  setLocale(locale: string): void;
  /** Resolves key with fallback locale and optional interpolation params. */
  t(key: string, params?: Record<string, string | number>): string;
}

/**
 * Creates a lightweight mutable localization store for React runtime usage.
 *
 * @param manifest Generated runtime manifest from localization-gen.
 * @param initialLocale Optional starting locale; defaults to `manifest.base_locale`.
 */
export function createReactLocalizationStore(manifest: RuntimeManifest, initialLocale?: string): ReactLocalizationStore {
  let locale = initialLocale ?? manifest.base_locale;

  return {
    getLocale: () => locale,
    setLocale(nextLocale) {
      locale = nextLocale;
    },
    t(key, params) {
      const value = lookupMessage(
        {
          locale,
          fallbackLocale: manifest.fallback_locale,
          messages: manifest.messages
        },
        key
      );
      return interpolate(value, params);
    }
  };
}
