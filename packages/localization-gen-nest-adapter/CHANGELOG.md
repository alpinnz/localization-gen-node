# Changelog

All notable changes to `localization-gen-nest-adapter` are documented in this file.

## [0.0.5] - 2026-05-05

### Added

- Initial release of NestJS runtime adapter
- `LocalizationModule.forRoot(manifest, options)` – NestJS dynamic module wiring
- `LocalizationService` – injectable singleton service: `translate`, `format`, `plural`, `gender`, `context`, `namespace`, `entriesForLocale`, `getCurrentLocale`, `runWithLocale`
- `LocalizationInterceptor` – HTTP interceptor for per-request locale detection via `Accept-Language` header, `?locale` query param, or custom header; powered by `AsyncLocalStorage` (no REQUEST scope needed)
- `@RequestLocale()` – controller parameter decorator that reads the active locale for the current request
- `createNestLocalizationStore` – low-level store factory with no NestJS dependency
- `createLazyLocaleLoader` – async per-locale message loader
- `mapRuntimeManifest` – identity passthrough manifest helper
- Peer dependency: `@nestjs/common ^10 || ^11`, `rxjs ^7`
- Requires `localization-gen-core ^0.0.5`

