# Changelog

All notable changes to `localization-gen-core` are documented in this file.

## [0.0.6] - 2026-05-11

### Added

- **`namespace_prefix`** config field in `localization-gen.yaml` — controls whether the module folder name is prepended to every generated key as a namespace prefix
  - `"module"` (default) — keys are emitted as `auth.login.page_title`
  - `"none"` — keys are emitted as `login.page_title`; use only when all key paths are globally unique across modules
- **`NamespacePrefix`** type (`"module" | "none"`) exported from public API (`localization-gen-core`)
- Generated `app-localization.ts` now exports **`AppLocalization`** type (`typeof appLocalization`) so consumers can annotate props and function parameters without redundant type declarations
- Generated `app-localization.types.ts` now exports **`AppLocalizationNode`** — a recursive base type for the accessor tree (`{ readonly [key: string]: string | AppLocalizationNode }`)
- `appLocalization` constant in generated file now uses **`as const satisfies AppLocalizationNode`** — shape is validated at compile time while all leaf literal string types are preserved

### Fixed

- **`appLocalization` accessor tree** previously stripped the module prefix from every path segment (`.slice(1)`), causing:
  - `appLocalization.auth` to not exist — tree started from the second segment
  - Silent key collisions when two modules shared a sub-path (e.g. `auth.strings.*` and `home.strings.*` both resolved to `strings.*`)
  - Now the full key path is mirrored exactly: `appLocalization.auth.login.page_title` → `"auth.login.page_title"`

### Tests

- `compiler.test.ts`: added coverage for `namespace_prefix: "module"` (key includes module) and `namespace_prefix: "none"` (key excludes module)
- `config.test.ts`: added coverage for invalid `namespace_prefix` rejection and valid `namespace_prefix: "none"` acceptance

## [0.0.5] - 2026-05-05

### Added

- `"nest"` added as a valid value for the `framework` field in `localization-gen.yaml`
- `Framework` type updated from `"react" | "vue"` to `"react" | "vue" | "nest"` in `types/config.ts`
- Config validator (`validateConfig`) now accepts `nest` alongside `react` and `vue`; throws a descriptive error if an unknown framework is supplied

## [0.0.4] - 2026-04-20

### Changed

- Build script now applies executable permission to `dist/cli/index.js` so workspace CLI invocations remain runnable after clean/build cycles
- Package version bumped to `0.0.4` for synchronized monorepo release

## [0.0.3] - 2026-04-16

### Changed

- Package version bumped to `0.0.3` for synchronized monorepo release
- Release cleanup and pack/publish workflow prepared for this package

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
