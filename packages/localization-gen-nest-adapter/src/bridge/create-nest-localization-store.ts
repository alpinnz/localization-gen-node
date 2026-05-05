import { interpolate, lookupMessage } from "localization-gen-core/runtime";
import type { RuntimeManifest } from "localization-gen-core";

/**
 * Minimal runtime store contract used by the NestJS adapter service.
 */
export interface NestLocalizationStore {
  /** Returns the current active locale. */
  getLocale(): string;
  /** Updates the active locale. */
  setLocale(locale: string): void;
  /** Resolves a key with fallback locale support and optional interpolation params. */
  t(key: string, params?: Record<string, string | number>): string;
}

/**
 * Creates a lightweight mutable localization store for NestJS runtime usage.
 *
 * @param manifest Generated runtime manifest from localization-gen.
 * @param initialLocale Optional starting locale; defaults to `manifest.base_locale`.
 */
export function createNestLocalizationStore(
  manifest: RuntimeManifest,
  initialLocale?: string
): NestLocalizationStore {
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

