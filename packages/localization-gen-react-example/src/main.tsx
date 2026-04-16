import React from "react";
import ReactDOM from "react-dom/client";
import LocalizationProvider from "localization-gen-react-adapter";
import appLocalizationManifest from "./assets/localizations/app-localization";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider manifest={appLocalizationManifest}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);

