# Changelog

All notable changes to `localization-gen-core` are documented in this file.

## [0.0.2] - 2026-04-16

### Changed

- React and Vue adapter integration docs updated to use `useLocalization` as the primary helper API
- Adapter integration examples now show reusable hook/composable fallback via `useLocalization({ fallback })`
- Helper API table updated to document `translate(key, fallbackValue?)` as an override-friendly call
- Runtime helper naming standardized from `resolve*` to canonical `lookup*`/`pick*` names (`lookupMessage`, `pickPluralVariant`, `pickStructured*Variant`, and `parseModuleLocale`)

## [0.0.1] - 2026-04-16

### Added

- Initial release of core localization compiler/validator pipeline
- CLI commands: `init`, `generate`, `validate`, `clean`, `coverage`
- Runtime exports via `localization-gen-core/runtime`
- TypeScript runtime/model/manifest generation and report emission
- JSON-only source file support (`assets/localizations/<module>/<locale>.json`)

### Changed

- `class_name` field naming (snake_case) used consistently in generated manifest
- `fieldRename` option removed; output is always snake_case by default
