<template>
  <article class="query-card">
    <h2 class="query-card__title">{{ displayTitle }}</h2>

    <p class="query-card__description">{{ $i18n(query.i18nKey + '-desc') }}</p>

    <div class="query-card__meta">
      <div class="query-card__meta-item">
        <span class="query-card__meta-label">{{ $i18n('result-' + query.resultType) }}</span>
      </div>
      <div class="query-card__meta-item">
        <span class="query-card__meta-label">{{ $i18n('level-' + query.level) }}</span>
      </div>
      <div class="query-card__meta-item">
        <span class="query-card__meta-label">{{ $i18n('source') }}</span>
      </div>
    </div>

    <div class="query-card__actions">
      <cdx-button
        weight="primary"
        @click="goToDetail"
      >
        {{ $i18n('btn-view-query-detail') }}
      </cdx-button>
      <cdx-button
        weight="normal"
        @click="showAdaptation = !showAdaptation"
      >
        {{ showAdaptation ? $i18n('btn-hide-adapt') : $i18n('btn-adapt') }}
      </cdx-button>
    </div>

    <Transition name="fade">
      <div
        v-if="showAdaptation"
        class="query-card__adaptation"
      >
        <strong>{{ $i18n('adapt-title') }}</strong>
        <ul class="query-card__adaptation-list">
          <li
            v-for="i in query.adaptation.notesCount"
            :key="i"
          >
            {{ $i18n(query.i18nKey + '-adapt-note-' + i) }}
          </li>
        </ul>
        <p class="query-card__adaptation-line">
          {{ $i18n('adapt-line-prefix') }} {{ $i18n(query.adaptation.changeLine) }}
        </p>
      </div>
    </Transition>
  </article>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { CdxButton } from "@wikimedia/codex";
import { useI18n } from "vue-banana-i18n";
import { countries } from "../data/topics.js";
import { getCountryName } from "../utils/localeNames.js";

const i18n = useI18n();
const router = useRouter();

const props = defineProps({
  query: { type: Object, required: true },
  countryId: { type: String, required: true },
});

const showAdaptation = ref(false);

const countryName = computed(() => {
  const country = countries.find((c) => c.id === props.countryId);
  return country ? getCountryName(country.code, i18n.locale) || country.name : "";
});

const displayTitle = computed(() =>
  i18n.i18n(props.query.i18nKey + '-title', countryName.value)
);

function goToDetail() {
  router.push({
    name: "query-detail",
    params: { queryId: props.query.id },
    query: { country: props.countryId },
  });
}
</script>

<style scoped>
.query-card {
  padding: var( --spacing-300 );
  background-color: var( --background-color-base );
  border: 1px solid var( --border-color-base );
  border-radius: var( --border-radius-base );
  margin-bottom: var( --spacing-300 );
}
.query-card__title {
  margin: 0 0 var( --spacing-150 );
  font-size: var( --font-size-large );
  font-weight: var( --font-weight-bold );
  line-height: 1.25;
}
.query-card__description {
  margin: 0 0 var( --spacing-200 );
  max-width: 720px;
  color: var( --color-base );
  line-height: 1.65;
}
.query-card__meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var( --spacing-100 );
  margin-bottom: var( --spacing-200 );
}
.query-card__meta-item {
  padding: var( --spacing-100 );
  background-color: var( --background-color-interactive-subtle );
  border-radius: var( --border-radius-base );
}
.query-card__meta-label {
  font-weight: var( --font-weight-bold );
  font-size: var( --font-size-small );
}
.query-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var( --spacing-100 );
}
.query-card__adaptation {
  margin-top: var( --spacing-200 );
  padding: var( --spacing-200 );
  background-color: var( --background-color-interactive-subtle );
  border-left: 4px solid var( --color-progressive );
  border-radius: var( --border-radius-base );
  line-height: 1.6;
}
.query-card__adaptation-list {
  margin: var( --spacing-100 ) 0;
  padding-left: var( --spacing-200 );
}
.query-card__adaptation-list li {
  margin-bottom: var( --spacing-50 );
  font-size: var( --font-size-small );
  color: var( --color-base );
}
.query-card__adaptation-line {
  margin-top: var( --spacing-100 );
  font-family: var( --font-family-monospace );
  font-size: var( --font-size-small );
  background-color: var( --background-color-progressive-subtle );
  padding: var( --spacing-100 );
  border-radius: var( --border-radius-base );
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
