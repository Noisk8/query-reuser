import { ref } from "vue";
import { useI18n } from "vue-banana-i18n";

const STORAGE_KEY = "query-reuser-language";
export const AVAILABLE_LOCALES = ["es", "en"];

const RTL_LANGUAGES = new Set([
  "ar", "arc", "dv", "fa", "ha", "he", "khw", "ks", "ku", "ps", "ur", "yi",
]);

function isRtl(code) {
  return RTL_LANGUAGES.has(code.toLowerCase());
}

function resolveLocale(code) {
  return AVAILABLE_LOCALES.includes(code) ? code : "es";
}

export function getInitialLocale() {
  if (typeof window === "undefined") return "es";
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang") || localStorage.getItem(STORAGE_KEY) || "es";
  return resolveLocale(requested);
}

export function applyLocale(code) {
  if (!code) return;
  document.documentElement.lang = code;
  document.documentElement.dir = isRtl(code) ? "rtl" : "ltr";
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore storage errors
  }
}

export function useLanguage() {
  const i18n = useI18n();
  const currentLocale = ref(i18n.locale);

  function setLocale(code) {
    const validCode = resolveLocale(code);
    if (validCode === currentLocale.value) return;
    i18n.setLocale(validCode);
    currentLocale.value = validCode;
    applyLocale(validCode);

    const url = new URL(window.location.href);
    if (validCode !== "es") {
      url.searchParams.set("lang", validCode);
    } else {
      url.searchParams.delete("lang");
    }
    window.location.href = url.toString();
  }

  return {
    currentLocale,
    setLocale,
  };
}
