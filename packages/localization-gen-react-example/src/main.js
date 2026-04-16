import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import LocalizationProvider from "localization-gen-react-adapter";
import appLocalizationManifest from "./assets/localizations/app-localization";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(LocalizationProvider, { manifest: appLocalizationManifest, children: _jsx(App, {}) }) }));
//# sourceMappingURL=main.js.map