import { useCallback, useMemo } from "react";
import {
  interpolate,
  resolveString,
  resolveStructuredContext,
  resolveStructuredGender,
  resolveStructuredPlural
} from "localization-gen-core/runtime";
import { useLocalization } from "./useLocalization.js";

export type InterpolationParams = Record<string, string | number>;
export type GenderVariant = "male" | "female" | "other";

/**
 * Namespace-scoped translation helpers.
 *
 * @remarks
 * Use this object when your UI works inside a fixed module namespace
 * (`common`, `auth`, `settings`, ...). Keys passed to each method are
 * relative to that namespace.
 */
export interface NamespacedLocalizer {
  /** Resolves plain string key in current namespace. */
  translate(key: string): string;
  /** Resolves and interpolates placeholder key in current namespace. */
  format(key: string, params: InterpolationParams): string;
  /** Resolves structured plural key in current namespace. */
  plural(key: string, count: number): string;
  /** Resolves structured gender key in current namespace. */
  gender(key: string, gender: GenderVariant, params: InterpolationParams): string;
  /** Resolves structured context key in current namespace. */
  context(key: string, context: string, params?: InterpolationParams): string;
}

export interface LocalizationHelpers {
  /** Resolves plain string key with locale fallback. */
  translate(key: string): string;
  /** Resolves and interpolates placeholder key. */
  format(key: string, params: InterpolationParams): string;
  /** Resolves structured plural key. */
  plural(key: string, count: number): string;
  /** Resolves structured gender key. */
  gender(key: string, gender: GenderVariant, params: InterpolationParams): string;
  /** Resolves structured context key. */
  context(key: string, context: string, params?: InterpolationParams): string;
  /** Creates a namespace-scoped helper object for the given module name. */
  namespace(scope: string): NamespacedLocalizer;
  entriesForLocale: Array<[string, string]>;
}

/**
 * Provides high-level runtime helpers on top of `useLocalization()`.
 *
 * @returns Base localization context + helper utilities:
 * - `translate` plain resolver with locale fallback
 * - `format` resolver + placeholder interpolation
 * - `plural`/`gender`/`context` structured resolvers
 * - `createNamespace(namespace)` to create namespace-scoped helpers
 * - `entriesForLocale` sorted `[key, value]` pairs for the active locale
 *
 * @example
 * const { namespace } = useLocalizationHelpers();
 * const auth = namespace("auth");
 * auth.translate("strings.login_title");
 */
export function useLocalizationHelpers(): ReturnType<typeof useLocalization> & LocalizationHelpers {
  const localization = useLocalization();
  const { locale, manifest } = localization;

  const runtimeContext = useMemo(
    () => ({
      locale,
      fallbackLocale: manifest.fallback_locale,
      messages: manifest.messages
    }),
    [locale, manifest.fallback_locale, manifest.messages]
  );

  const t = useCallback(
    (key: string) => resolveString(runtimeContext, key),
    [runtimeContext]
  );

  const ti = useCallback(
    (key: string, params: InterpolationParams) => interpolate(t(key), params),
    [t]
  );

  const raw = useCallback(
    (key: string) =>
      manifest.messages[locale]?.[key] ??
      manifest.messages[manifest.fallback_locale]?.[key] ??
      "",
    [locale, manifest.fallback_locale, manifest.messages]
  );

  const tp = useCallback(
    (key: string, count: number) => resolveStructuredPlural(raw(key), count),
    [raw]
  );

  const tg = useCallback(
    (key: string, gender: GenderVariant, params: InterpolationParams) =>
      interpolate(resolveStructuredGender(raw(key), gender), params),
    [raw]
  );

  const tc = useCallback(
    (key: string, context: string, params?: InterpolationParams) => {
      const value = resolveStructuredContext(raw(key), context);
      return params ? interpolate(value, params) : value;
    },
    [raw]
  );

  const namespace = useCallback(
    (scope: string): NamespacedLocalizer => ({
      translate: (key: string) => t(`${scope}.${key}`),
      format: (key: string, params: InterpolationParams) => ti(`${scope}.${key}`, params),
      plural: (key: string, count: number) => tp(`${scope}.${key}`, count),
      gender: (key: string, gender: GenderVariant, params: InterpolationParams) =>
        tg(`${scope}.${key}`, gender, params),
      context: (key: string, context: string, params?: InterpolationParams) =>
        tc(`${scope}.${key}`, context, params)
    }),
    [t, ti, tp, tg, tc]
  );

  const entriesForLocale = useMemo(
    () =>
      Object.entries(manifest.messages[locale] ?? {}).sort(([a], [b]) =>
        a.localeCompare(b)
      ),
    [locale, manifest.messages]
  );

  return {
    ...localization,
    translate: t,
    format: ti,
    plural: tp,
    gender: tg,
    context: tc,
    namespace,
    entriesForLocale
  };
}
