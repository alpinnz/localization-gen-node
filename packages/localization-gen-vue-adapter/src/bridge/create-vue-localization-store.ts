import { reactive } from "vue";
import { interpolate, resolveString } from "localization-gen-core/runtime";
import type { RuntimeManifest } from "localization-gen-core";

export function createVueLocalizationStore(manifest: RuntimeManifest, initialLocale?: string) {
  const state = reactive({
    locale: initialLocale ?? manifest.base_locale
  });

  return {
    state,
    setLocale(locale: string) {
      state.locale = locale;
    },
    t(key: string, params?: Record<string, string | number>) {
      const value = resolveString(
        {
          locale: state.locale,
          fallbackLocale: manifest.fallback_locale,
          messages: manifest.messages
        },
        key
      );
      return interpolate(value, params);
    }
  };
}

