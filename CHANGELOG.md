# Changelog

All notable changes to this project are documented in this file.

## [0.0.4] - 2026-04-20

### Changed

- Root and workspace-local localization scripts now rebuild `localization-gen-core` before invoking CLI commands, so `clean` no longer breaks `generate`/`validate`/`watch`
- Core build now marks `dist/cli/index.js` executable to avoid permission errors from workspace bin shims
- Workspace versions and internal package references bumped to `0.0.4`

## [0.0.3] - 2026-04-16

### Changed

- Workspace versions and internal package references bumped to `0.0.3`
- Release pipeline cleanup and packaging workflow standardized across publishable packages

## [0.0.2] - 2026-04-16

### Added

- Hook/composable-level fallback configuration via `useLocalization({ fallback })` in React and Vue adapters
- Optional per-call fallback override on `translate(key, fallbackValue?)`

### Changed

- React and Vue examples now use full translation keys directly for easier JSON comparison
- Adapter docs and core integration docs aligned to `useLocalization` as primary helper API with reusable fallback setup
- Runtime/helper naming standardized from ambiguous `resolve*` patterns to canonical `lookup*`/`pick*` terminology across core and adapters

### Removed

- React `useLocalizationHelpers` API surface in favor of `useLocalization`

## [0.0.1] - 2026-04-16

### Added

- npm workspaces monorepo with core, React adapter/example, and Vue adapter/example
- Core CLI and modular localization pipeline scaffolding (`init`, `generate`, `validate`, `clean`, `coverage`)
- Runtime output/report generation flow
- Publish-ready packaging baseline for library workspaces
- `LocalizationProvider` + `useLocalizationHelpers` for React
- `createLocalizationPlugin` + `useLocalization` composable for Vue

### Changed

- Canonical adapter helper naming: `translate`, `format`, `plural`, `gender`, `context`, `namespace`
- `class_name` snake_case naming in generated manifests
- JSON-only localization source files

### Removed

- `.jsonc` file support
- Deprecated adapter aliases: `t`, `ti`, `tp`, `tg`, `tc`, `ns`, `createNamespace`, `interpolate`, `resolvePlural`, `resolveGender`, `resolveContext`
