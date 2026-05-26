# Changelog

All notable changes to `localization-gen-react-adapter` are documented in this file.

## [0.1.0] - 2026-05-26

### Changed

- `translateOrNull(key)`, `formatOrNull(key, params)`, and `pluralOrNull(key, count)` now accept `key` as `string | null | undefined`
- When `key` is `null` or `undefined`, all three methods immediately return `null` without performing any lookup
- The same null-safe behavior applies to the equivalent methods on `NamespacedLocalizer` (returned by `namespace(scope)`)
- New unit tests added to cover `null` and `undefined` key inputs for all three methods (both top-level and namespaced)

## [0.0.9] - 2026-05-23

### Added

- **Nullable translation helpers** — three new methods on `useLocalization()` and `NamespacedLocalizer` that return `null` instead of a fallback string when a key does not exist in any locale:
  - `translateOrNull(key)` — returns `string | null`; use for conditional UI rendering
  - `formatOrNull(key, params)` — returns `string | null`; safe interpolation when a key may be absent
  - `pluralOrNull(key, count)` — returns `string | null`; safe plural resolution when a structured key may be absent
- All three methods are also available through `namespace(scope)` (e.g. `ns.translateOrNull("title")`)
- A key is considered "found" when it exists in the **active locale OR the fallback locale**; only truly missing keys produce `null`

## [0.0.8] - 2026-05-21

### Added

- **Pluggable locale storage** — `LocalizationProvider` now accepts an optional `storage` prop (`LocaleStorage` interface) to persist the selected locale across page reloads
- Built-in storage strategy factories:
  - `localStorageStrategy(options?)` — persists in `window.localStorage`
  - `sessionStorageStrategy(options?)` — persists in `window.sessionStorage` (cleared on tab close)
  - `cookieStrategy(options?)` — persists as an HTTP cookie; supports `domain`, `path`, `maxAge`, `secure`, and `sameSite` options for SSR/middleware compatibility
  - `memoryStrategy(options?)` — in-memory only, no persistence (useful for testing or SSR)
  - `composeStorage(...storages)` — combines multiple strategies: reads from the first with a value, writes to all
- All strategy factories and the `LocaleStorage` interface are exported from the package root
- `LocalizationProviderProps` interface exported from the package root

### Changed

- `LocalizationProvider` locale resolution priority: `storage.get()` → `initialLocale` prop → `manifest.base_locale`
- `setLocale()` now automatically calls `storage.set(locale)` when a `storage` is provided — no consumer changes required
- Stored locale values that are not present in `manifest.locales` are silently ignored (falls through to `initialLocale`)
- **Backwards compatible** — existing usage without `storage` prop is unaffected



### Changed

- `translate(key, fallbackValue?)` now accepts `null` as `fallbackValue` — passing `null` explicitly bypasses hook-level fallback and always returns the key string itself when the key is missing
- `fallbackValue` parameter type widened from `string | undefined` to `string | null | undefined` in `useLocalization`, `NamespacedLocalizer` interface, and `namespace()` helper
- Return type of `translate` remains strictly `string` (non-nullable) in all call paths

## [0.0.6] - 2026-05-11

### Changed

- Package version bumped to `0.0.6` for synchronized monorepo release
- Peer dependency updated to `localization-gen-core@^0.0.6`

### Notes

- Generated `app-localization.ts` now exports `AppLocalization` type and uses `as const satisfies AppLocalizationNode` — no adapter code changes required; consumers benefit automatically after re-running `localization-gen generate`
- `appLocalization` accessor tree now includes the module name as the top-level key (e.g. `appLocalization.auth.login.page_title`); previously the module prefix was incorrectly stripped

## [0.0.4] - 2026-04-20

### Changed

- Package version bumped to `0.0.4` for synchronized monorepo release
- Internal dependency range updated to `localization-gen-core@^0.0.4`

## [0.0.3] - 2026-04-16

### Changed

- Package version bumped to `0.0.3` for synchronized monorepo release
- Internal dependency range updated to `localization-gen-core@^0.0.3`

## [0.0.2] - 2026-04-16

### Added

- `useLocalization({ fallback })` support for reusable fallback text at hook level
- Optional per-call fallback override on `translate(key, fallbackValue?)`

### Changed

- `useLocalization` now exposes full high-level helper surface (`translate`, `format`, `plural`, `gender`, `context`, `namespace`, `entriesForLocale`)
- Internal runtime imports now use canonical `lookup*`/`pick*` helper names from `localization-gen-core/runtime`

### Removed

- `useLocalizationHelpers` export and hook; use `useLocalization` instead
- Standalone `createFallbackTranslator` export; fallback behavior is now owned by `useLocalization`

## [0.0.1] - 2026-04-16

### Added

- Initial release of React runtime adapter
- `LocalizationProvider`, `useLocalization`, `useAppLocalization`
- `useLocalizationHelpers` hook with high-level translation helpers
- Locale store bridge and lazy/SSR helper utilities
- Compatibility with manifests generated by `localization-gen-core`

### Changed

- Canonical helper naming: `translate`, `format`, `plural`, `gender`, `context`, `namespace`

### Removed

- Deprecated helper aliases: `t`, `ti`, `tp`, `tg`, `tc`, `interpolate`, and legacy variant aliases for plural/gender/context
- Deprecated `ns(scope)` alias; use `namespace(scope)` instead
- Deprecated `createNamespace(scope)`; renamed to `namespace(scope)`
