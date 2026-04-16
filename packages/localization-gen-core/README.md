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
import { useLocalizationHelpers } from "localization-gen-react-adapter";

export default function App() {
  const { locale, setLocale, manifest, translate, format, plural, gender, context, namespace } =
    useLocalizationHelpers();

  const authNs = namespace("auth");
  const homeNs = namespace("home");

  return (
    <>
      {/* Locale switcher */}
      {manifest.locales.map((l) => (
        <button key={l} onClick={() => setLocale(l)}>{l.toUpperCase()}</button>
      ))}

      {/* Plain string */}
      <h1>{authNs.translate("strings.login_title")}</h1>

      {/* Placeholder interpolation */}
      <p>{authNs.format("placeholders.welcome_back", { name: "Alfin" })}</p>

      {/* Structured plural */}
      <p>{authNs.plural("structured.lock_message", 3)}</p>

      {/* Structured gender */}
      <p>{homeNs.gender("structured.host_title", "female", { last_name: "Rahma" })}</p>

      {/* Structured context */}
      <p>{authNs.context("structured.channel_label", "email")}</p>
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

const { locale, setLocale, manifest, namespace } = useLocalization();

const authNs = namespace("auth");
const homeNs = namespace("home");
</script>

<template>
  <!-- Locale switcher -->
  <button v-for="l in manifest.locales" :key="l" @click="setLocale(l)">
    {{ l.toUpperCase() }}
  </button>

  <!-- Plain string -->
  <h1>{{ authNs.translate("strings.login_title") }}</h1>

  <!-- Placeholder interpolation -->
  <p>{{ authNs.format("placeholders.welcome_back", { name: "Alfin" }) }}</p>

  <!-- Structured plural -->
  <p>{{ authNs.plural("structured.lock_message", 3) }}</p>

  <!-- Structured gender -->
  <p>{{ homeNs.gender("structured.host_title", "female", { last_name: "Rahma" }) }}</p>

  <!-- Structured context -->
  <p>{{ authNs.context("structured.channel_label", "email") }}</p>
</template>
```

---

## Helper API

All helpers are available both at the top level and via `namespace(scope)` (keys relative to the module):

| Method | Signature | Description |
|---|---|---|
| `translate` | `(key) → string` | Plain string with locale fallback |
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
  resolveString,
  resolveStructuredPlural,
  resolveStructuredGender,
  resolveStructuredContext,
} from "localization-gen-core/runtime";

resolveString(ctx, "auth.strings.login_title");
interpolate("Hello, {name}!", { name: "Alfin" });
resolveStructuredPlural(rawValue, 3);
resolveStructuredGender(rawValue, "female");
resolveStructuredContext(rawValue, "email");
```

> **Note:** Root entry (`localization-gen-core`) is Node-only (CLI/compiler).
> Always import runtime helpers from `localization-gen-core/runtime` in browser/app code.
