import { computed } from "vue";
import {
  interpolate,
  resolveString,
  resolveStructuredContext,
  resolveStructuredGender,
  resolveStructuredPlural
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
export function useLocalization() {
  const { store, manifest } = useLocalizationContext();

  const locale = computed(() => store.state.locale);

  const t = (key: string) =>
    resolveString(
      {
        locale: locale.value,
        fallbackLocale: manifest.fallback_locale,
        messages: manifest.messages
      },
      key
    );

  const ti = (key: string, params: InterpolationParams) => interpolate(t(key), params);

  /** Returns the raw stored value (plain string or JSON-encoded structured variants). */
  const raw = (key: string) => {
    const loc = store.state.locale;
    return manifest.messages[loc]?.[key] ?? manifest.messages[manifest.fallback_locale]?.[key] ?? "";
  };

  const tp = (key: string, count: number) => resolveStructuredPlural(raw(key), count);
  const tg = (key: string, gender: GenderVariant, params: InterpolationParams) =>
    interpolate(resolveStructuredGender(raw(key), gender), params);
  const tc = (key: string, context: string, params?: InterpolationParams) => {
    const value = resolveStructuredContext(raw(key), context);
    return params ? interpolate(value, params) : value;
  };

  const namespace = (scope: string): NamespacedLocalizer => ({
    translate: (key: string) => t(`${scope}.${key}`),
    format: (key: string, params: InterpolationParams) => ti(`${scope}.${key}`, params),
    plural: (key: string, count: number) => tp(`${scope}.${key}`, count),
    gender: (key: string, gender: GenderVariant, params: InterpolationParams) =>
      tg(`${scope}.${key}`, gender, params),
    context: (key: string, context: string, params?: InterpolationParams) =>
      tc(`${scope}.${key}`, context, params)
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
    translate: t,
    format: ti,
    plural: tp,
    gender: tg,
    context: tc,
    namespace,
    entriesForLocale
  };
}
