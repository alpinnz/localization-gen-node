import type { RuntimeManifest } from "localization-gen-core";

export function createSsrLocalizationState(manifest: RuntimeManifest, locale?: string) {
  const resolvedLocale = locale ?? manifest.base_locale;
  return {
    locale: resolvedLocale,
    messages: manifest.messages[resolvedLocale] ?? {}
  };
}

