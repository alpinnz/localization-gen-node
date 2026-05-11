# localization-gen-core

Core package for modular localization generation — compiler, CLI, validator, and runtime helpers.

> **Tip:** For React or Vue apps, install the framework adapter instead of using runtime helpers directly.
> The adapter wraps all runtime functions into ergonomic hooks/composables.

---

## Install

```bash
npm install localization-gen-core
```

---

## Getting started

### 1. Initialize your project

```bash
npx localization-gen init
```

This creates a `localization-gen.yaml` config and the `assets/localizations/` directory structure.

### 2. Add localization files

Place your JSON files under:

```
assets/
  localizations/
    common/
      en.json
      id.json
    auth/
      en.json
      id.json
```

### 3. Generate the runtime manifest

```bash
npx localization-gen generate
```

This outputs a manifest file (e.g. `assets/localizations/app-localization.ts`) that your app imports at runtime.

---

## CLI reference

```bash
localization-gen init                                   # scaffold config + directory
localization-gen generate                               # compile JSON → manifest
localization-gen generate --watch                       # watch mode
localization-gen validate                               # validate keys, placeholders, structured parity
localization-gen clean                                  # remove generated output
localization-gen coverage                               # print translation coverage report
localization-gen coverage --format=html --output=coverage.html
```

---

## Configuration (`localization-gen.yaml`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `input_dir` | `string` | `"assets/localizations"` | Directory containing module folders with JSON locale files |
| `output_dir` | `string` | `"src/assets/localizations"` | Directory where generated files are written |
| `framework` | `"react" \| "vue" \| "nest"` | `"react"` | Target framework for runtime file generation |
| `base_locale` | `string` | `"en"` | Default locale used when the app starts |
| `fallback_locale` | `string` | `"en"` | Locale used when a key is missing in the active locale |
| `strict` | `boolean` | `true` | Fail the generate command when validation errors are present |
| `namespace_prefix` | `"module" \| "none"` | `"module"` | Whether the module folder name is prepended to every generated key as a namespace prefix (see below) |

### `namespace_prefix`

Controls how generated keys are scoped:

```yaml
# "module" (default) — module name is prepended as a namespace prefix
namespace_prefix: module
# auth/en.json key "login.page_title" → generated as "auth.login.page_title"
# accessed via: appLocalization.auth.login.page_title

# "none" — key is emitted as-is without module prefix
namespace_prefix: none
# auth/en.json key "login.page_title" → generated as "login.page_title"
# accessed via: appLocalization.login.page_title
```

> **Warning:** Use `namespace_prefix: none` only when all key paths are globally unique across every module. Collisions will silently overwrite each other at runtime.

---

## Using with React

Install the React adapter:

```bash
npm install localization-gen-react-adapter react
```

Wrap your app with the provider:

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LocalizationProvider from "localization-gen-react-adapter";
import manifest from "./assets/localizations/app-localization";
import App from "./App";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <LocalizationProvider manifest={manifest}>
      <App />
    </LocalizationProvider>
  </StrictMode>
);
```

Use helpers in your components:

```tsx
// App.tsx
import { useLocalization } from "localization-gen-react-adapter";
import { appLocalization } from "./assets/localizations/app-localization";

export default function App() {
  const { locale, setLocale, manifest, translate, format, plural, gender, context } = useLocalization({
    fallback: {
      [appLocalization.auth.strings.login_title]: "Login",
    },
  });

  return (
    <>
      {/* Locale switcher */}
      {manifest.locales.map((l) => (
        <button key={l} onClick={() => setLocale(l)}>{l.toUpperCase()}</button>
      ))}

      {/* Plain string with optional hook-level fallback */}
      <h1>{translate(appLocalization.auth.strings.login_title)}</h1>

      {/* Placeholder interpolation */}
      <p>{format(appLocalization.auth.placeholders.welcome_back, { name: "Alfin" })}</p>

      {/* Structured plural */}
      <p>{plural(appLocalization.auth.structured.lock_message, 3)}</p>

      {/* Structured gender */}
      <p>{gender(appLocalization.home.structured.host_title, "female", { last_name: "Rahma" })}</p>

      {/* Structured context */}
      <p>{context(appLocalization.auth.structured.channel_label, "email")}</p>
    </>
  );
}
```

---

## Using with Vue

Install the Vue adapter:

```bash
npm install localization-gen-vue-adapter vue
```

Register the plugin:

```ts
// main.ts
import { createApp } from "vue";
import createLocalizationPlugin from "localization-gen-vue-adapter";
import manifest from "./assets/localizations/app-localization";
import App from "./App.vue";

const app = createApp(App);
app.use(createLocalizationPlugin(manifest));
app.mount("#app");
```

Use the composable in your components:

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useLocalization } from "localization-gen-vue-adapter";
import { appLocalization } from "./assets/localizations/app-localization";

const { locale, setLocale, manifest, translate, format, plural, gender, context } = useLocalization({
  fallback: {
    [appLocalization.auth.strings.login_title]: "Login",
  },
});
</script>

<template>
  <!-- Locale switcher -->
  <button v-for="l in manifest.locales" :key="l" @click="setLocale(l)">
    {{ l.toUpperCase() }}
  </button>

  <!-- Plain string with optional hook-level fallback -->
  <h1>{{ translate(appLocalization.auth.strings.login_title) }}</h1>

  <!-- Placeholder interpolation -->
  <p>{{ format(appLocalization.auth.placeholders.welcome_back, { name: "Alfin" }) }}</p>

  <!-- Structured plural -->
  <p>{{ plural(appLocalization.auth.structured.lock_message, 3) }}</p>

  <!-- Structured gender -->
  <p>{{ gender(appLocalization.home.structured.host_title, "female", { last_name: "Rahma" }) }}</p>

  <!-- Structured context -->
  <p>{{ context(appLocalization.auth.structured.channel_label, "email") }}</p>
</template>
```

---

## Type-safe key access with `appLocalization`

Every generated `app-localization.ts` exports an `appLocalization` constant and an `AppLocalization` type
that mirror the full key tree. Use them instead of hardcoded strings to get compile-time safety and IDE autocomplete.

```ts
import { appLocalization } from "./assets/localizations/app-localization";
import type { AppLocalization } from "./assets/localizations/app-localization";

// Resolve key with full type safety
translate(appLocalization.auth.login.page_title)
// → translate("auth.login.page_title")

// Use AppLocalization as a type annotation
function pickKey(fn: (t: AppLocalization) => string): string {
  return fn(appLocalization);
}
pickKey((t) => t.home.strings.home_title);

// Fallback map with computed keys — no magic strings
const fallback = {
  [appLocalization.auth.strings.login_title]: "Login",
  [appLocalization.home.strings.home_title]: "Home",
};
```

The generated types file (`app-localization.types.ts`) also exports `AppLocalizationNode` — the recursive base
type for the tree — which `appLocalization` is validated against via `satisfies` at compile time.

---

## Helper API

All helpers are available both at the top level and via `namespace(scope)` (keys relative to the module):

| Method | Signature | Description |
|---|---|---|
| `translate` | `(key, fallbackValue?) → string` | Plain string with locale fallback, optional hook fallback, and optional per-call override |
| `format` | `(key, params) → string` | String with `{placeholder}` interpolation |
| `plural` | `(key, count) → string` | Structured plural form |
| `gender` | `(key, "male"\|"female"\|"other", params) → string` | Structured gender form |
| `context` | `(key, context, params?) → string` | Structured context form |
| `namespace` | `(scope) → NamespacedLocalizer` | Module-scoped helper (keys without module prefix) |

---

## Low-level runtime usage

If you are building a custom adapter or integrating without a framework, you can import
runtime functions directly:

```ts
import {
  interpolate,
  lookupMessage,
  pickStructuredPluralVariant,
  pickStructuredGenderVariant,
  pickStructuredContextVariant,
} from "localization-gen-core/runtime";

lookupMessage(ctx, "auth.strings.login_title");
interpolate("Hello, {name}!", { name: "Alfin" });
pickStructuredPluralVariant(rawValue, 3);
pickStructuredGenderVariant(rawValue, "female");
pickStructuredContextVariant(rawValue, "email");
```

> **Note:** Root entry (`localization-gen-core`) is Node-only (CLI/compiler).
> Always import runtime helpers from `localization-gen-core/runtime` in browser/app code.
