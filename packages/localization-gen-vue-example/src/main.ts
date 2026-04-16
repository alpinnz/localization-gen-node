import { createApp } from "vue";
import { createLocalizationPlugin } from "localization-gen-vue-adapter";
import appLocalizationManifest from "./assets/localizations/app-localization";
import App from "./App.vue";

const app = createApp(App);
app.use(createLocalizationPlugin(appLocalizationManifest));
app.mount("#app");

