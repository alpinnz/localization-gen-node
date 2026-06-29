# Changelog

All notable changes to `localization-gen-core` are documented in this file.

## [0.0.9] - 2026-06-29

### Fixed

- **Generated manifest constant is now a named export — `export default` removed** — previously the generated `*localization.ts` emitted the manifest as `const manifest: ${Type}Manifest` with a trailing `export default manifest`. The manifest is now `export const ${shortBase}Manifest: ${Type}Manifest` (e.g. `export const libManifest: LibLocalizationManifest`) and no default export is emitted. Consumers must use a named import: `import { libManifest } from "./lib-localization"`.
- **`libManifest` short-form naming** — the manifest constant now uses a short camelCase name derived from the leading segment of `class_name` (e.g. `LibLocalizations` → `libManifest`, `AppLocalizations` → `appManifest`) instead of the previous `${base}Manifest` form (`libLocalizationManifest`, `appLocalizationManifest`).

## [0.0.8] - 2026-06-28

### Fixed

- **`coverage` CLI command and reporting emit** — `src/coverage-build/build-coverage-json.ts` and `src/coverage-build/build-coverage-html.ts` were missing from the source tree, so `tsc` failed to resolve them and the monorepo build (`npm run build`) was broken before any package could be produced. The directory is named `coverage-build/` (not `coverage/`) so the root `.gitignore` rule `**/coverage/` (which excludes Istanbul/Jest coverage output) does not swallow the source. Both modules are now implemented:
  - `buildCoverageJson(manifest)` returns `{ totals: { locales, modules, keys }, byLocale: { [locale]: { keys } } }`. `modules` counts distinct first dotted segments (or `_root` for keys without a segment); `byLocale[locale].keys` counts entries that have a translation in that locale.
  - `buildCoverageHtml(report)` renders a self-contained HTML page (no external assets) with a per-locale coverage table; locale labels are HTML-escaped.
- **Generated runtime identifiers now honor `class_name`** — previously, `buildReactRuntimeFiles` (used by both the React and Vue frameworks via `buildVueRuntimeFiles`) hardcoded the `AppLocalization*` types and `appLocalization*` consts and imported the types from a hardcoded `./app-localization.types` path. Non-default configs (e.g. `class_name: LibLocalizations` with `runtime_entry_file: lib-localization.ts` / `runtime_types_file: lib-localization.types.ts`) still emitted `App*` identifiers and pointed at a missing `./app-localization.types` import.
  - All emitted identifiers are now derived from `class_name`:
    - types `${Base}Manifest`, `${Base}Node` (e.g. `LibLocalizationManifest`, `LibLocalizationNode`)
    - accessor tree alias `${Base}` (e.g. `LibLocalization`)
    - manifest const `${shortBase}Manifest` (e.g. `libManifest`, `appManifest`)
    - accessor const `${base}Localization` (e.g. `libLocalization`, `appLocalization`)
    - `Base` strips a trailing `s` from `class_name` and `base` is `Base` camelCased; `shortBase` is the leading PascalCase segment of `Base` split on the `Localization` boundary, keeping the manifest constant name short
  - The entry file's types import now follows `config.generated.runtime_types_file`, so renaming the output filenames no longer breaks the import
  - The manifest constant is now emitted as a named `export const` and the previous `export default` is removed — consumers should import the manifest by name (e.g. `import { libManifest } from "./lib-localization"`)
  - Default `class_name: AppLocalizations` produces byte-identical type/accessor identifiers to before, but the manifest constant is renamed from `appManifest` (which previously had no explicit export) to an exported `appManifest` and the default export is gone — **this is a breaking change for any consumer that imported the manifest as the default export**.
- **`buildVueRuntimeFiles`** and **`compileProject`** now forward `config` to the builder so the new identifier derivation has the inputs it needs

### Tests

- `coverage.test.ts`: 5 new tests covering `buildCoverageJson` totals/per-locale counts, module count fallback for keys without a dotted segment, empty-manifest edge case, `buildCoverageHtml` row rendering and coverage percentage formatting, and HTML escaping of hostile locale labels.

## [0.0.7] - 2026-05-23

### Fixed

- **`generate` CLI command** now prints detailed diagnostic messages to stderr via `renderTerminalReport` before throwing, making it easy to identify which localization keys/placeholders caused the failure without additional debugging

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
