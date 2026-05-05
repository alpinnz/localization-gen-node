// Module
export { LocalizationModule } from "./module/LocalizationModule.js";

// Service
export { LocalizationService } from "./service/LocalizationService.js";
export type { InterpolationParams, GenderVariant, NamespacedLocalizer } from "./service/LocalizationService.js";

// Interceptor
export { LocalizationInterceptor } from "./interceptor/LocalizationInterceptor.js";

// Decorator
export { RequestLocale } from "./decorator/RequestLocale.js";

// Bridge
export { createNestLocalizationStore } from "./bridge/create-nest-localization-store.js";
export type { NestLocalizationStore } from "./bridge/create-nest-localization-store.js";
export { mapRuntimeManifest } from "./bridge/map-runtime-manifest.js";

// Lazy
export { createLazyLocaleLoader } from "./lazy/create-lazy-locale-loader.js";

// Types & constants
export type { LocalizationModuleOptions } from "./types.js";
export { LOCALIZATION_MANIFEST_TOKEN, LOCALIZATION_OPTIONS_TOKEN } from "./constants.js";

