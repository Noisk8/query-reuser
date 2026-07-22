import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createI18n } from "vue-banana-i18n";
import "@wikimedia/codex/dist/codex.style.css";
import "./assets/main.css";
import { getInitialLocale, applyLocale } from "./composables/useLanguage.js";

const localeFiles = import.meta.glob("./i18n/*.json", { eager: true });

const messages = Object.fromEntries(
  Object.entries(localeFiles)
    .filter(([path]) => !path.endsWith("/qqq.json"))
    .map(([path, module]) => [
      path.match(/\/([^/]+)\.json$/)[1],
      module.default,
    ])
);

const initialLocale = getInitialLocale();
applyLocale(initialLocale);

const i18nPlugin = createI18n({
  locale: initialLocale,
  fallbackLocale: "en",
  messages,
});

createApp(App).use(router).use(i18nPlugin).mount("#app");
