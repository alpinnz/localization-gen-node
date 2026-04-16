# Changelog

All notable changes to this project are documented in this file.

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
