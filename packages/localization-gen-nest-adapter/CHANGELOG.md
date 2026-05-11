# Changelog

All notable changes to `localization-gen-nest-adapter` are documented in this file.

## [0.0.6] - 2026-05-11

### Changed

- Package version bumped to `0.0.6` for synchronized monorepo release
- Peer dependency updated to `localization-gen-core@^0.0.6`

### Notes

- Generated `app-localization.ts` now exports `AppLocalization` type and uses `as const satisfies AppLocalizationNode` — no adapter code changes required; consumers benefit automatically after re-running `localization-gen generate`
- `appLocalization` accessor tree now includes the module name as the top-level key (e.g. `appLocalization.auth.login.page_title`); previously the module prefix was incorrectly stripped

## [0.0.5] - 2026-05-05

### Added

- **`LocalizationModule`** — NestJS dynamic module; register with `LocalizationModule.forRoot(manifest, options)`
  - `options.isGlobal` — makes the module globally available without per-module imports
  - `options.localeHeader` — custom HTTP header name for locale detection (e.g. `"x-locale"`)
  - `options.localeQueryParam` — query param name for locale detection (default `"locale"`)
- **`LocalizationService`** — injectable singleton service (no REQUEST scope required):
  - `translate(key, fallbackValue?, locale?)` — resolves a plain string key with optional fallback
  - `format(key, params, locale?)` — resolves and interpolates `{placeholder}` values
  - `plural(key, count, locale?)` — picks the correct `@plural` structured variant by count
  - `gender(key, genderValue, params, locale?)` — picks the `@gender` structured variant and interpolates
  - `context(key, contextValue, params?, locale?)` — picks the `@context` structured variant and interpolates
  - `namespace(scope, locale?)` — returns a scoped helper that prefixes every key with `scope`
  - `entriesForLocale(locale?)` — returns all `[key, value]` pairs for a locale, sorted alphabetically
  - `getCurrentLocale()` — returns the locale bound to the current async context (or `base_locale` fallback)
  - `runWithLocale(locale, fn)` — runs `fn` inside an async context where `getCurrentLocale()` returns `locale`; useful for background jobs and tests
  - `raw(key, locale?)` — returns the raw stored string (plain or JSON-encoded structured variants)
  - `getManifest()` — returns the full `RuntimeManifest` instance
- **`LocalizationInterceptor`** — NestJS HTTP interceptor powered by `AsyncLocalStorage`:
  - Detects locale in priority order: custom header → query param → `Accept-Language` first tag → `base_locale`
  - Only accepts locales listed in `manifest.locales`; unknown values fall back to `base_locale`
  - Binds detected locale to the async context for the full request lifecycle
- **`@RequestLocale()`** — controller parameter decorator that reads `request.activeLocale` set by the interceptor; falls back to `Accept-Language` first tag when the interceptor has not run (e.g. WebSocket contexts)
- **`createNestLocalizationStore(manifest, initialLocale?)`** — low-level mutable store (no NestJS dependency): exposes `getLocale()`, `setLocale(locale)`, `t(key, params?)`
- **`createLazyLocaleLoader(manifest)`** — returns an async `(locale) => Record<string, string>` loader for per-locale message access
- **`mapRuntimeManifest(manifest)`** — identity passthrough helper for manifest transformation pipelines
- **`LOCALIZATION_MANIFEST_TOKEN`** / **`LOCALIZATION_OPTIONS_TOKEN`** — injection tokens exported for advanced DI scenarios
- Peer dependencies: `@nestjs/common ^10 || ^11`, `rxjs ^7`
- Runtime dependency: `localization-gen-core ^0.0.5`

