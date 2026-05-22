import { useCallback, useContext, useMemo } from "react";
import {
  interpolate,
  lookupMessage,
  pickStructuredContextVariant,
  pickStructuredGenderVariant,
  pickStructuredPluralVariant
} from "localization-gen-core/runtime";
import { LocalizationContext } from "../provider/LocalizationProvider.js";

export type InterpolationParams = Record<string, string | number>;
export type GenderVariant = "male" | "female" | "other";

export interface NamespacedLocalizer {
  translate(key: string, fallbackValue?: string | null): string;
  /** Returns `null` when the key does not exist in any locale. */
  translateOrNull(key: string): string | null;
  format(key: string, params: InterpolationParams): string;
  /** Returns `null` when the key does not exist in any locale. */
  formatOrNull(key: string, params: InterpolationParams): string | null;
  plural(key: string, count: number): string;
  /** Returns `null` when the key does not exist in any locale. */
  pluralOrNull(key: string, count: number): string | null;
  gender(key: string, gender: GenderVariant, params: InterpolationParams): string;
  context(key: string, context: string, params?: InterpolationParams): string;
}

export type TranslationFallback =
  | string
  | Record<string, string>
  | ((key: string) => string | undefined);

export interface UseLocalizationOptions {
  fallback?: TranslationFallback;
}


function pickFallbackText(fallback: TranslationFallback | undefined, key: string): string | undefined {
  if (!fallback) {
    return undefined;
  }
  if (typeof fallback === "string") {
    return fallback;
  }
  if (typeof fallback === "function") {
    return fallback(key);
  }
  return fallback[key];
}

/**
 * Returns the current localization context from `LocalizationProvider`.
 *
 * @throws Error when called outside `LocalizationProvider`.
 */

export function useLocalization(options: UseLocalizationOptions = {}) {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within LocalizationProvider.");
  }

  const { locale, manifest } = context;
  const fallback = options.fallback;

  const runtimeContext = useMemo(
    () => ({
      locale,
      fallbackLocale: manifest.fallback_locale,
      messages: manifest.messages
    }),
    [locale, manifest.fallback_locale, manifest.messages]
  );

  const readTranslation = useCallback(
    (key: string) => lookupMessage(runtimeContext, key),
    [runtimeContext]
  );

  /**
   * Returns `true` when `key` exists in the current locale **or** the fallback
   * locale.  Used internally by `tryTranslate`, `tryFormat`, `tryPlural`.
   */
  const hasKey = useCallback(
    (key: string): boolean =>
      key in (manifest.messages[locale] ?? {}) ||
      key in (manifest.messages[manifest.fallback_locale] ?? {}),
    [locale, manifest.fallback_locale, manifest.messages]
  );

  const translate = useCallback(
    (key: string, fallbackValue?: string | null): string => {
      const translatedValue = readTranslation(key);
      if (!translatedValue || translatedValue === key) {
        if (fallbackValue === null) return translatedValue;
        return fallbackValue ?? pickFallbackText(fallback, key) ?? translatedValue;
      }
      return translatedValue;
    },
    [fallback, readTranslation]
  );

  const format = useCallback(
    (key: string, params: InterpolationParams) => interpolate(translate(key), params),
    [translate]
  );

  // ── Nullable variants ─────────────────────────────────────────────────────

  /** Returns `null` when the key does not exist in any locale. */
  const translateOrNull = useCallback(
    (key: string): string | null => (hasKey(key) ? translate(key) : null),
    [hasKey, translate]
  );

  /** Returns `null` when the key does not exist in any locale. */
  const formatOrNull = useCallback(
    (key: string, params: InterpolationParams): string | null =>
      hasKey(key) ? format(key, params) : null,
    [hasKey, format]
  );

  const raw = useCallback(
    (key: string) =>
      manifest.messages[locale]?.[key] ??
      manifest.messages[manifest.fallback_locale]?.[key] ?? "",
    [locale, manifest.fallback_locale, manifest.messages]
  );

  const plural = useCallback(
    (key: string, count: number) => pickStructuredPluralVariant(raw(key), count),
    [raw]
  );

  /** Returns `null` when the key does not exist in any locale. */
  const pluralOrNull = useCallback(
    (key: string, count: number): string | null =>
      hasKey(key) ? plural(key, count) : null,
    [hasKey, plural]
  );

  const gender = useCallback(
    (key: string, value: GenderVariant, params: InterpolationParams) =>
      interpolate(pickStructuredGenderVariant(raw(key), value), params),
    [raw]
  );

  const contextValue = useCallback(
    (key: string, value: string, params?: InterpolationParams) => {
      const translated = pickStructuredContextVariant(raw(key), value);
      return params ? interpolate(translated, params) : translated;
    },
    [raw]
  );

  const namespace = useCallback(
    (scope: string): NamespacedLocalizer => ({
      translate: (key: string, fallbackValue?: string | null) =>
        translate(`${scope}.${key}`, fallbackValue),
      translateOrNull: (key: string) => translateOrNull(`${scope}.${key}`),
      format: (key: string, params: InterpolationParams) => format(`${scope}.${key}`, params),
      formatOrNull: (key: string, params: InterpolationParams) => formatOrNull(`${scope}.${key}`, params),
      plural: (key: string, count: number) => plural(`${scope}.${key}`, count),
      pluralOrNull: (key: string, count: number) => pluralOrNull(`${scope}.${key}`, count),
      gender: (key: string, value: GenderVariant, params: InterpolationParams) =>
        gender(`${scope}.${key}`, value, params),
      context: (key: string, value: string, params?: InterpolationParams) =>
        contextValue(`${scope}.${key}`, value, params)
    }),
    [translate, translateOrNull, format, formatOrNull, plural, pluralOrNull, gender, contextValue]
  );

  const entriesForLocale = useMemo(
    () =>
      Object.entries(manifest.messages[locale] ?? {}).sort(([a], [b]) =>
        a.localeCompare(b)
      ),
    [locale, manifest.messages]
  );

  return {
    ...context,
    translate,
    translateOrNull,
    format,
    formatOrNull,
    plural,
    pluralOrNull,
    gender,
    context: contextValue,
    namespace,
    entriesForLocale
  };
}
