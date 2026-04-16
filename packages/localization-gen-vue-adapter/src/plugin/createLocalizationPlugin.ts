import type { App } from "vue";
import { inject } from "vue";
import type { RuntimeManifest } from "localization-gen-core";
import { createVueLocalizationStore } from "../bridge/create-vue-localization-store.js";

const LOCALIZATION_KEY = Symbol("localization");

export function createLocalizationPlugin(manifest: RuntimeManifest, initialLocale?: string) {
  const store = createVueLocalizationStore(manifest, initialLocale);

  return {
    install(app: App) {
      app.provide(LOCALIZATION_KEY, { store, manifest });
    }
  };
}

export function useLocalizationContext() {
  const context = inject<{ store: ReturnType<typeof createVueLocalizationStore>; manifest: RuntimeManifest }>(LOCALIZATION_KEY);
  if (!context) {
    throw new Error("Localization plugin is not installed.");
  }
  return context;
}

