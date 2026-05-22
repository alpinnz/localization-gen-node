export { default as LocalizationProvider } from "./provider/LocalizationProvider.js";
export type { LocalizationProviderProps, LocalizationContextValue } from "./provider/LocalizationProvider.js";
export { useLocalization } from "./hooks/useLocalization.js";
export { useAppLocalization } from "./hooks/useAppLocalization.js";
export { createReactLocalizationStore } from "./bridge/create-react-localization-store.js";
export { mapRuntimeManifest } from "./bridge/map-runtime-manifest.js";
export { createLazyLocaleLoader } from "./lazy/create-lazy-locale-loader.js";
export { createSsrLocalizationState } from "./ssr/create-ssr-localization-state.js";

// ─── Locale Storage strategies ────────────────────────────────────────────────
export type { LocaleStorage } from "./storage/locale-storage.js";
export {
  localStorageStrategy,
  sessionStorageStrategy,
  cookieStrategy,
  memoryStrategy,
  composeStorage
} from "./storage/locale-storage.js";

export { default } from "./provider/LocalizationProvider.js";
