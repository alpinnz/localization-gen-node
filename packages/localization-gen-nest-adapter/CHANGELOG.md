# Changelog

## 0.0.5

### Initial release

- `LocalizationModule.forRoot()` – NestJS dynamic module wiring
- `LocalizationService` – injectable singleton service with `translate`, `format`, `plural`, `gender`, `context`, `namespace`, `entriesForLocale`, `runWithLocale`, `getCurrentLocale`
- `LocalizationInterceptor` – HTTP interceptor for per-request locale detection (`Accept-Language`, query param, custom header) powered by `AsyncLocalStorage`
- `RequestLocale` – controller parameter decorator (`@RequestLocale()`)
- `createNestLocalizationStore` – low-level store factory (no NestJS dependency)
- `createLazyLocaleLoader` – async per-locale message loader
- `mapRuntimeManifest` – identity passthrough manifest helper
- Requires `localization-gen-core ^0.0.5`

