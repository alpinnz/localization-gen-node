# localization-gen-nest-example

> Example NestJS REST API demonstrating [`localization-gen-nest-adapter`](../localization-gen-nest-adapter).

## Getting Started

### 1. Install dependencies (from monorepo root)

```bash
npm install
```

### 2. Generate the localization manifest

```bash
npm run nest:generate
# or from this directory:
npx localization-gen generate
```

### 3. Run the API in development mode

```bash
cd packages/localization-gen-nest-example
npm run dev
```

Server starts at **http://localhost:3000**

---

## API Endpoints

All endpoints resolve locale from:
1. `?locale=id` query parameter (highest priority)
2. `Accept-Language: id` request header
3. Default: `en`

### `GET /localization/hello`
Simple greeting in the resolved locale.

```bash
curl http://localhost:3000/localization/hello
curl http://localhost:3000/localization/hello?locale=id
curl http://localhost:3000/localization/hello -H "Accept-Language: id"
```

### `GET /localization/welcome?name=Alfin`
Personalised welcome message with placeholder interpolation.

```bash
curl "http://localhost:3000/localization/welcome?name=Alfin&locale=id"
```

### `GET /localization/user`
Shows `@gender` and `@context` structured translations.

```bash
curl "http://localhost:3000/localization/user?gender=female&lastName=Rahma&role=admin&locale=id"
```

### `GET /localization/items`
Shows `@plural` structured translations.

```bash
curl "http://localhost:3000/localization/items?total=5&locale=id"
curl "http://localhost:3000/localization/items?total=0"
curl "http://localhost:3000/localization/items?total=1"
```

### `GET /localization/statuses`
Returns all API status messages.

```bash
curl "http://localhost:3000/localization/statuses?locale=id"
```

### `GET /localization/locales`
Returns available locales metadata.

```bash
curl http://localhost:3000/localization/locales
```

### `GET /localization/entries?locale=id`
Returns all key-value pairs for a locale.

```bash
curl "http://localhost:3000/localization/entries?locale=id"
```

---

## localization-gen commands

| Command | Description |
|---|---|
| `npm run localization-gen:generate` | Generate manifest from source JSON files |
| `npm run localization-gen:validate` | Validate source JSON files |
| `npm run localization-gen:watch` | Watch and regenerate on changes |
| `npm run localization-gen:coverage` | Generate coverage report |
| `npm run localization-gen:clean` | Remove generated files |

---

## Project Structure

```
├── assets/
│   └── localizations/         ← Source JSON files (you maintain these)
│       ├── common/
│       │   ├── en.json
│       │   └── id.json
│       └── api/
│           ├── en.json
│           └── id.json
├── src/
│   ├── assets/
│   │   └── localizations/     ← Generated manifest (do not edit manually)
│   │       ├── app-localization.ts
│   │       └── app-localization.types.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
├── tests/
│   └── smoke.test.ts
└── localization-gen.yaml
```

