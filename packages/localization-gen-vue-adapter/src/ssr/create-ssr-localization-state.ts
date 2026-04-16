import type { RuntimeManifest } from "localization-gen-core";

export function createSsrLocalizationState(manifest: RuntimeManifest, locale?: string) {
  const activeLocale = locale ?? manifest.base_locale;
  return {
    locale: activeLocale,
    messages: manifest.messages[activeLocale] ?? {}
  };
}

