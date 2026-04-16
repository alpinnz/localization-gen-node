# localization-gen-node monorepo

A modular localization generator monorepo with core compiler/validator, React and Vue adapters, and runnable example apps.

## Quick start

```bash
npm install
npm run react:generate
npm run vue:generate
npm run test
```

## Workspaces

| Package | Description |
|---|---|
| `localization-gen-core` | Core CLI, compiler, validator, runtime helpers |
| `localization-gen-react-adapter` | React provider + `useLocalization` hook |
| `localization-gen-react-example` | Runnable React demo app (private) |
| `localization-gen-vue-adapter` | Vue plugin + `useLocalization` composable |
| `localization-gen-vue-example` | Runnable Vue demo app (private) |

## Adapter API summary

Both adapters expose a consistent helper surface:

| Method | Description |
|---|---|
| `translate(key, fallbackValue?)` | Plain string resolver with locale fallback and optional UI fallback |
| `format(key, params)` | Resolver + `{placeholder}` interpolation |
| `plural(key, count)` | Structured plural resolver |
| `gender(key, variant, params)` | Structured gender resolver |
| `context(key, ctx, params?)` | Structured context resolver |
| `namespace(scope)` | Returns a module-scoped `NamespacedLocalizer` |

All methods are also available on the object returned by `namespace(scope)`, with keys relative to the module.

## Publish-ready libraries

- Publishable packages: `localization-gen-core`, `localization-gen-react-adapter`, `localization-gen-vue-adapter`
- Example apps are private workspaces and are not published.
- Libraries are built to `dist/` and use `prepack` to ensure fresh artifacts before `npm publish`.
- Package docs:
  - `packages/localization-gen-core/README.md`
  - `packages/localization-gen-react-adapter/README.md`
  - `packages/localization-gen-vue-adapter/README.md`

## Release checks

Release commands live in each publishable package:

- `packages/localization-gen-core`
- `packages/localization-gen-react-adapter`
- `packages/localization-gen-vue-adapter`

## Project policies

- Changelog: `CHANGELOG.md`
- Security policy: `SECURITY.md`
- License: `LICENSE`
