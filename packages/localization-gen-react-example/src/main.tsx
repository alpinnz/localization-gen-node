import React from "react";
import ReactDOM from "react-dom/client";
import LocalizationProvider, { cookieStrategy, localStorageStrategy, composeStorage } from "localization-gen-react-adapter";
import appLocalizationManifest from "./assets/localizations/app-localization";
import App from "./App";

// ─── Storage strategy examples ────────────────────────────────────────────────
//
// Pick ONE of the strategies below and pass it to the `storage` prop.
//
// 1. localStorage  — persists across tabs, cleared by user/JS
//    storage={localStorageStrategy()}
//    storage={localStorageStrategy({ key: "app_locale" })}
//
// 2. sessionStorage — persists only for the current tab
//    storage={sessionStorageStrategy()}
//
// 3. Cookie — readable server-side (SSR/middleware), can be scoped to a domain
//    storage={cookieStrategy()}
//    storage={cookieStrategy({ domain: ".example.com", maxAge: 60 * 60 * 24 * 365 })}
//
// 4. In-memory — no persistence, useful for testing
//    storage={memoryStrategy()}
//
// 5. Composed — try cookie first (SSR-compatible), fall back to localStorage
//    storage={composeStorage(cookieStrategy({ domain: ".example.com" }), localStorageStrategy())}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Best-practice setup for a multi-domain SPA:
 *  - Cookie is the primary store so the server can read it for SSR/middleware
 *  - localStorage is the fallback for environments that block cookies
 */
const localeStorage = composeStorage(
  cookieStrategy({ domain: ".example.com", maxAge: 60 * 60 * 24 * 365, sameSite: "Lax" }),
  localStorageStrategy({ key: "app_locale" })
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider
      manifest={appLocalizationManifest}
      storage={localeStorage}
      // initialLocale is only used when nothing is found in storage
      initialLocale="en"
    >
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);



