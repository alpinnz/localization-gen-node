import { computed } from "vue";
import {
  interpolate,
  lookupMessage,
  pickStructuredContextVariant,
  pickStructuredGenderVariant,
  pickStructuredPluralVariant
} from "localization-gen-core/runtime";
import { useLocalizationContext } from "../plugin/createLocalizationPlugin.js";

function setNested(target: Record<string, unknown>, path: string[], value: unknown): void {
  if (path.length === 0) {
    return;
  }
  let cursor = target;
  for (let i = 0; i < path.length - 1; i += 1) {
    const segment = path[i];
    if (!segment) {
      continue;
    }
    cursor[segment] ??= {};
    cursor = cursor[segment] as Record<string, unknown>;
  }
  const leaf = path[path.length - 1];
  if (!leaf) {
    return;
  }
  cursor[leaf] = value;
}

export type InterpolationParams = Record<string, string | number>;
export type GenderVariant = "male" | "female" | "other";
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

export interface NamespacedLocalizer {
  /** Resolves plain string key in current namespace. */
  translate(key: string, fallbackValue?: string): string;
  /** Resolves and interpolates placeholder key in current namespace. */
  format(key: string, params: InterpolationParams): string;
  /** Resolves structured plural key in current namespace. */
  plural(key: string, count: number): string;
  /** Resolves structured gender key in current namespace. */
  gender(key: string, gender: GenderVariant, params: InterpolationParams): string;
  /** Resolves structured context key in current namespace. */
  context(key: string, context: string, params?: InterpolationParams): string;
}

export function useLocalization(options: UseLocalizationOptions = {}) {
  const { store, manifest } = useLocalizationContext();
  const fallback = options.fallback;

  const locale = computed(() => store.state.locale);

  const readTranslation = (key: string) =>
    lookupMessage(
      {
        locale: locale.value,
        fallbackLocale: manifest.fallback_locale,
        messages: manifest.messages
      },
      key
    );

  const translate = (key: string, fallbackValue?: string) => {
    const translatedValue = readTranslation(key);
    if (!translatedValue || translatedValue === key) {
      return fallbackValue ?? pickFallbackText(fallback, key) ?? translatedValue;
    }
    return translatedValue;
  };

  const format = (key: string, params: InterpolationParams) =>
    interpolate(translate(key), params);

  /** Returns the raw stored value (plain string or JSON-encoded structured variants). */
  const raw = (key: string) => {
    const loc = store.state.locale;
    return manifest.messages[loc]?.[key] ?? manifest.messages[manifest.fallback_locale]?.[key] ?? "";
  };

  const plural = (key: string, count: number) => pickStructuredPluralVariant(raw(key), count);
  const gender = (key: string, genderValue: GenderVariant, params: InterpolationParams) =>
    interpolate(pickStructuredGenderVariant(raw(key), genderValue), params);
  const context = (key: string, contextValue: string, params?: InterpolationParams) => {
    const value = pickStructuredContextVariant(raw(key), contextValue);
    return params ? interpolate(value, params) : value;
  };

  const namespace = (scope: string): NamespacedLocalizer => ({
    translate: (key: string, fallbackValue?: string) =>
      translate(`${scope}.${key}`, fallbackValue),
    format: (key: string, params: InterpolationParams) => format(`${scope}.${key}`, params),
    plural: (key: string, count: number) => plural(`${scope}.${key}`, count),
    gender: (key: string, genderValue: GenderVariant, params: InterpolationParams) =>
      gender(`${scope}.${key}`, genderValue, params),
    context: (key: string, contextValue: string, params?: InterpolationParams) =>
      context(`${scope}.${key}`, contextValue, params)
  });

  const entriesForLocale = computed(() =>
    Object.entries(manifest.messages[locale.value] ?? {}).sort(([a], [b]) =>
      a.localeCompare(b)
    )
  );

  const appLocalization = computed(() => {
    const strings: Record<string, unknown> = {};
    const placeholders: Record<string, unknown> = {};

    for (const entry of manifest.entries) {
      // Strip module prefix; property names preserve source key segments.
      const parts = entry.key.split(".").slice(1);
      if (entry.placeholders.length > 0) {
        setNested(placeholders, parts, (params: InterpolationParams) => store.t(entry.key, params));
      } else {
        setNested(strings, parts, store.t(entry.key));
      }
    }

    return {
      strings,
      simple: strings,
      placeholders
    };
  });

  return {
    locale,
    setLocale: store.setLocale,
    appLocalization,
    manifest,
    raw,
    translate,
    format,
    plural,
    gender,
    context,
    namespace,
    entriesForLocale
  };
}
