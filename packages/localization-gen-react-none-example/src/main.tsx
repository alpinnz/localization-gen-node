import React from "react";
import ReactDOM from "react-dom/client";
import LocalizationProvider from "localization-gen-react-adapter";
import { libManifest } from "./assets/localizations/lib-localization";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider manifest={libManifest}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);

