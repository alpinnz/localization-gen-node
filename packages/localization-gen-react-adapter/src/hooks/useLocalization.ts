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
  translate(key: string, fallbackValue?: string): string;
  format(key: string, params: InterpolationParams): string;
  plural(key: string, count: number): string;
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

  const translate = useCallback(
    (key: string, fallbackValue?: string) => {
      const translatedValue = readTranslation(key);
      if (!translatedValue || translatedValue === key) {
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
      translate: (key: string, fallbackValue?: string) =>
        translate(`${scope}.${key}`, fallbackValue),
      format: (key: string, params: InterpolationParams) => format(`${scope}.${key}`, params),
      plural: (key: string, count: number) => plural(`${scope}.${key}`, count),
      gender: (key: string, value: GenderVariant, params: InterpolationParams) =>
        gender(`${scope}.${key}`, value, params),
      context: (key: string, value: string, params?: InterpolationParams) =>
        contextValue(`${scope}.${key}`, value, params)
    }),
    [translate, format, plural, gender, contextValue]
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
    format,
    plural,
    gender,
    context: contextValue,
    namespace,
    entriesForLocale
  };
}
