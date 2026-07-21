import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createI18n } from "vue-banana-i18n";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import qqq from "./i18n/qqq.json";
import "@wikimedia/codex/dist/codex.style.css";
import "./assets/main.css";
import { getInitialLocale, applyLocale } from "./composables/useLanguage.js";

const messages = { en, es, qqq };
const initialLocale = getInitialLocale();
applyLocale(initialLocale);

const i18nPlugin = createI18n({
  locale: initialLocale,
  fallbackLocale: "en",
  messages,
});

createApp(App).use(router).use(i18nPlugin).mount("#app");
