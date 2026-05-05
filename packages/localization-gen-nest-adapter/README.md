# localization-gen-nest-adapter

> NestJS module, service and interceptor for runtime consumption of
> [localization-gen-node](https://github.com/alpinnz/localization-gen-node) generated output.

## Installation

```bash
npm install localization-gen-nest-adapter localization-gen-core
```

Peer dependencies required:

```bash
npm install @nestjs/common rxjs
```

---

## Quick Start

### 1. Generate your localization manifest

```bash
localization-gen generate
```

This produces `src/assets/localizations/app-localization.ts` (or whatever you configured).

### 2. Register the module

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { LocalizationModule } from "localization-gen-nest-adapter";
import appManifest from "./assets/localizations/app-localization";

@Module({
  imports: [
    LocalizationModule.forRoot(appManifest, { isGlobal: true }),
  ],
})
export class AppModule {}
```

### 3. Apply the interceptor (global)

```ts
// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LocalizationInterceptor } from "localization-gen-nest-adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const interceptor = app.get(LocalizationInterceptor);
  app.useGlobalInterceptors(interceptor);
  await app.listen(3000);
}
bootstrap();
```

### 4. Use in controllers / services

```ts
// app.controller.ts
import { Controller, Get } from "@nestjs/common";
import { LocalizationService } from "localization-gen-nest-adapter";

@Controller()
export class AppController {
  constructor(private readonly l10n: LocalizationService) {}

  @Get("hello")
  hello() {
    // Locale is resolved automatically from Accept-Language / ?locale= by the interceptor
    return { message: this.l10n.translate("common.greeting") };
  }

  @Get("welcome")
  welcome() {
    return { message: this.l10n.format("common.welcome_user", { name: "Alfin" }) };
  }
}
```

---

## Locale Detection Order

`LocalizationInterceptor` looks for the locale in the following order:

1. Custom header (`options.localeHeader`, e.g. `x-locale`)
2. Query parameter (`options.localeQueryParam`, default `locale`)
3. First tag of the `Accept-Language` header
4. `manifest.base_locale` (fallback)

Only locales listed in `manifest.locales` are accepted.

---

## API Reference

### `LocalizationModule.forRoot(manifest, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `isGlobal` | `boolean` | `false` | Register module globally |
| `localeHeader` | `string` | — | Custom request header name |
| `localeQueryParam` | `string` | `"locale"` | Query param name |

### `LocalizationService`

| Method | Description |
|---|---|
| `getManifest()` | Returns the full `RuntimeManifest` |
| `getCurrentLocale()` | Returns locale from async context or `base_locale` |
| `runWithLocale(locale, fn)` | Executes `fn` with a pinned locale (useful in jobs / tests) |
| `translate(key, fallback?, locale?)` | Plain string lookup |
| `format(key, params, locale?)` | Lookup + placeholder interpolation |
| `plural(key, count, locale?)` | `@plural` structured variant |
| `gender(key, genderValue, params, locale?)` | `@gender` structured variant |
| `context(key, contextValue, params?, locale?)` | `@context` structured variant |
| `namespace(scope, locale?)` | Returns a scoped helper that prefixes keys with `scope` |
| `entriesForLocale(locale?)` | Returns sorted `[key, value]` pairs |

### `@RequestLocale()` (param decorator)

Extracts the resolved locale from the request object. Useful when you need the locale string directly in a controller method.

```ts
@Get("info")
info(@RequestLocale() locale: string) {
  return { locale };
}
```

---

## License

MIT

