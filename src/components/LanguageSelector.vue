<template>
  <div class="language-selector">
    <cdx-button
      class="language-selector__trigger"
      weight="quiet"
      @click="toggleDropdown"
    >
      {{ currentAutonym }}
    </cdx-button>

    <div v-if="showDropdown" class="language-selector__dropdown">
      <div class="language-selector__search">
        <cdx-text-input
          v-model="searchInput"
          input-type="search"
          :placeholder="$i18n('lang-label')"
          :start-icon="cdxIconSearch"
        />
      </div>

      <div class="language-selector__body">
        <section
          v-if="suggestedLanguages.length && !searchInput"
          class="language-selector__section"
        >
          <h3 class="language-selector__section-title">
            {{ $i18n('suggested-languages') }}
          </h3>
          <div class="language-selector__grid">
            <button
              v-for="lang in suggestedLanguages"
              :key="lang.code"
              class="language-selector__lang"
              @click="select(lang.code)"
            >
              {{ lang.autonym }}
            </button>
          </div>
        </section>

        <section class="language-selector__section">
          <h3 class="language-selector__section-title">
            {{ searchInput ? $i18n('search-results') : $i18n('all-languages') }}
          </h3>
          <div class="language-selector__grid">
            <button
              v-for="lang in filteredLanguages"
              :key="lang.code"
              class="language-selector__lang"
              @click="select(lang.code)"
            >
              {{ lang.autonym }}
            </button>
          </div>
          <p v-if="!filteredLanguages.length" class="language-selector__empty">
            {{ $i18n('no-language-results') }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { CdxButton, CdxTextInput } from '@wikimedia/codex'
import { cdxIconSearch } from '@wikimedia/codex-icons'
import { useLanguage, AVAILABLE_LOCALES } from '../composables/useLanguage.js'

const { currentLocale, setLocale } = useLanguage()
const showDropdown = ref(false)
const searchInput = ref('')
const loading = ref(true)
const languages = ref([])

const LANGUAGE_API = 'https://en.wikipedia.org/w/api.php'

const SPANISH_NAMES = {
  en: 'inglés', es: 'español', fr: 'francés', de: 'alemán', pt: 'portugués',
  it: 'italiano', ja: 'japonés', zh: 'chino', ru: 'ruso', ar: 'árabe',
  ko: 'coreano', nl: 'neerlandés', pl: 'polaco', sv: 'sueco', da: 'danés',
  fi: 'finlandés', cs: 'checo', el: 'griego', he: 'hebreo', th: 'tailandés',
  vi: 'vietnamita', id: 'indonesio', tr: 'turco', uk: 'ucraniano', hi: 'hindi',
  ca: 'catalán', fa: 'persa', ro: 'rumano', hu: 'húngaro', no: 'noruego',
  als: 'alsaciano', ast: 'asturiano', ba: 'baskir', be: 'bielorruso',
  bg: 'búlgaro', bn: 'bengalí', br: 'bretón', bs: 'bosnio', ca: 'catalán',
  ce: 'checheno', co: 'corso', cy: 'galés', et: 'estonio', eu: 'euskera',
  ga: 'irlandés', gl: 'gallego', hr: 'croata', hy: 'armenio', is: 'islandés',
  ka: 'georgiano', kk: 'kazajo', lb: 'luxemburgués', lt: 'lituano', lv: 'letón',
  mk: 'macedonio', ml: 'malayalam', mn: 'mongol', mr: 'maratí', ms: 'malayo',
  mt: 'maltés', nn: 'nynorsk', oc: 'occitano', sco: 'escocés', sk: 'eslovaco',
  sl: 'esloveno', sq: 'albanés', sr: 'serbio', ta: 'tamil', te: 'telugu',
  tg: 'tayiko', tl: 'tagalo', tt: 'tártaro', uz: 'uzbeko', vo: 'volapük',
}

const FALLBACK_LANGUAGES = [
  { code: 'es', autonym: 'Español', name: 'Spanish' },
  { code: 'en', autonym: 'English', name: 'English' },
  { code: 'fr', autonym: 'Français', name: 'French' },
  { code: 'de', autonym: 'Deutsch', name: 'German' },
  { code: 'pt', autonym: 'Português', name: 'Portuguese' },
  { code: 'it', autonym: 'Italiano', name: 'Italian' },
  { code: 'ja', autonym: '日本語', name: 'Japanese' },
  { code: 'zh', autonym: '中文', name: 'Chinese' },
  { code: 'ru', autonym: 'Русский', name: 'Russian' },
  { code: 'ar', autonym: 'العربية', name: 'Arabic' },
  { code: 'ko', autonym: '한국어', name: 'Korean' },
  { code: 'nl', autonym: 'Nederlands', name: 'Dutch' },
  { code: 'pl', autonym: 'Polski', name: 'Polish' },
  { code: 'sv', autonym: 'Svenska', name: 'Swedish' },
  { code: 'da', autonym: 'Dansk', name: 'Danish' },
  { code: 'fi', autonym: 'Suomi', name: 'Finnish' },
  { code: 'cs', autonym: 'Čeština', name: 'Czech' },
  { code: 'el', autonym: 'Ελληνικά', name: 'Greek' },
  { code: 'he', autonym: 'עברית', name: 'Hebrew' },
  { code: 'th', autonym: 'ไทย', name: 'Thai' },
  { code: 'vi', autonym: 'Tiếng Việt', name: 'Vietnamese' },
  { code: 'id', autonym: 'Bahasa Indonesia', name: 'Indonesian' },
  { code: 'tr', autonym: 'Türkçe', name: 'Turkish' },
  { code: 'uk', autonym: 'Українська', name: 'Ukrainian' },
  { code: 'hi', autonym: 'हिन्दी', name: 'Hindi' },
  { code: 'ca', autonym: 'Català', name: 'Catalan' },
  { code: 'fa', autonym: 'فارسی', name: 'Persian' },
  { code: 'ro', autonym: 'Română', name: 'Romanian' },
  { code: 'hu', autonym: 'Magyar', name: 'Hungarian' },
  { code: 'no', autonym: 'Norsk', name: 'Norwegian' },
]

const SUGGESTED_CODES = [
  'es', 'en', 'fr', 'de', 'pt', 'it', 'ja', 'zh', 'ru', 'ar', 'ko', 'nl',
]

const availableLanguages = computed(() =>
  languages.value.filter((lang) => AVAILABLE_LOCALES.includes(lang.code))
)

const suggestedLanguages = computed(() =>
  SUGGESTED_CODES.map((code) => availableLanguages.value.find((l) => l.code === code))
    .filter(Boolean)
)

const filteredLanguages = computed(() => {
  if (!searchInput.value) return availableLanguages.value
  const query = searchInput.value.toLowerCase()
  return availableLanguages.value.filter((lang) => {
    const spanishName = SPANISH_NAMES[lang.code] || ''
    const terms = [lang.code, lang.autonym, lang.name, spanishName]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return terms.includes(query)
  })
})

const currentAutonym = computed(() => {
  const lang = availableLanguages.value.find((l) => l.code === currentLocale.value)
  return lang?.autonym || currentLocale.value
})

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function select(code) {
  if (code) {
    setLocale(code)
  }
}

async function fetchLanguages() {
  try {
    const url = `${LANGUAGE_API}?action=query&meta=languageinfo&liprop=code|autonym|name&format=json&origin=*`
    const response = await fetch(url)
    const data = await response.json()
    const langInfo = data.query.languageinfo

    const fetched = Object.values(langInfo)
      .filter((lang) => lang.autonym || lang.name)
      .sort((a, b) => (a.autonym || a.name).localeCompare(b.autonym || b.name))

    const existingCodes = new Set(fetched.map((l) => l.code))
    const extras = FALLBACK_LANGUAGES
      .filter((l) => !existingCodes.has(l.code))

    languages.value = [...fetched, ...extras]
  } catch (error) {
    console.error('Failed to fetch languages:', error)
    languages.value = FALLBACK_LANGUAGES
  } finally {
    loading.value = false
  }
}

function closeOnClickOutside(event) {
  if (!event.target.closest('.language-selector')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  fetchLanguages()
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<style scoped>
.language-selector {
  position: relative;
}
.language-selector__trigger {
  font-weight: var(--font-weight-bold);
}
.language-selector__dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + var(--spacing-50));
  width: 360px;
  max-height: 520px;
  z-index: 100;
  background-color: var(--background-color-base);
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.language-selector__search {
  padding: var(--spacing-100) var(--spacing-150);
  border-bottom: 1px solid var(--border-color-base);
}
.language-selector__body {
  overflow-y: auto;
  padding: var(--spacing-100) var(--spacing-150);
}
.language-selector__section {
  margin-bottom: var(--spacing-200);
}
.language-selector__section:last-child {
  margin-bottom: 0;
}
.language-selector__section-title {
  margin: 0 0 var(--spacing-100);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  color: var(--color-subtle);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.language-selector__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-50);
}
.language-selector__lang {
  appearance: none;
  background: none;
  border: none;
  padding: var(--spacing-50) var(--spacing-100);
  text-align: left;
  color: var(--color-progressive);
  cursor: pointer;
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-medium);
}
.language-selector__lang:hover {
  background-color: var(--background-color-interactive-subtle);
  color: var(--color-progressive-hover);
}
.language-selector__empty {
  margin: 0;
  padding: var(--spacing-100);
  text-align: center;
  color: var(--color-subtle);
}
</style>
