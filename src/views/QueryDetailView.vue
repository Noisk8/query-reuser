<template>
  <section v-if="query" class="query-detail">
    <router-link to="/" class="query-detail__back">
      {{ $i18n('back-home') }}
    </router-link>

    <p class="query-detail__eyebrow">{{ topic.name }}</p>
    <h1 class="query-detail__title">{{ displayTitle }}</h1>
    <p class="query-detail__description">
      {{ $i18n(query.i18nKey + '-desc') }}
    </p>

    <div class="query-detail__section">
      <h2 class="query-detail__section-title">
        {{ $i18n('detail-what-it-does') }}
      </h2>
      <p class="query-detail__text">{{ $i18n(query.i18nKey + '-what-it-does') }}</p>
    </div>

    <div class="query-detail__section">
      <h2 class="query-detail__section-title">
        {{ $i18n('detail-prerequisites') }}
      </h2>
      <ul class="query-detail__list">
        <li v-for="i in query.info.prerequisitesCount" :key="i">
          {{ $i18n(query.i18nKey + '-prerequisite-' + i) }}
        </li>
      </ul>
    </div>

    <div class="query-detail__section">
      <h2 class="query-detail__section-title">
        {{ $i18n('detail-adaptation-guide') }}
      </h2>
      <ol class="query-detail__guide">
        <li
          v-for="step in query.adaptationGuide"
          :key="step.step"
          class="query-detail__guide-step"
        >
          <h3 class="query-detail__guide-title">{{ $i18n(query.i18nKey + '-step-' + step.step + '-title') }}</h3>
          <p class="query-detail__guide-desc">{{ $i18n(query.i18nKey + '-step-' + step.step + '-description') }}</p>
          <pre v-if="step.codeSnippet" class="query-detail__code"><code>{{ step.codeSnippet }}</code></pre>
        </li>
      </ol>
    </div>

    <WikidataPlayground :query="query" :country-id="selectedCountry" />
  </section>

  <section v-else class="query-detail__empty">
    <h1>{{ $i18n('query-not-found-title') }}</h1>
    <p>{{ $i18n('query-not-found-desc') }}</p>
    <router-link to="/">{{ $i18n('back-home') }}</router-link>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-banana-i18n";
import { getQueryById, countries } from "../data/topics.js";
import WikidataPlayground from "../components/WikidataPlayground.vue";
import { getCountryName } from "../utils/localeNames.js";

const route = useRoute();
const i18n = useI18n();

const found = getQueryById(route.params.queryId);
const topic = found?.topic ?? null;
const query = found?.query ?? null;

const selectedCountry = ref(route.query.country || "Q298");

const displayTitle = computed(() => {
  const country = countries.find((c) => c.id === selectedCountry.value);
  const countryName = country ? getCountryName(country.code, i18n.locale) || country.name : "";
  return i18n.i18n(query.i18nKey + "-title", countryName);
});
</script>

<style scoped>
.query-detail {
  max-width: 960px;
  padding: clamp(1.5rem, 4vw, 3rem) 0 var(--spacing-500);
}
.query-detail__back {
  display: inline-flex;
  align-items: center;
  margin-bottom: var(--spacing-300);
  color: var(--color-progressive);
  text-decoration: none;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
}
.query-detail__back:hover {
  text-decoration: underline;
}
.query-detail__eyebrow {
  display: inline-block;
  margin: 0 0 var(--spacing-100);
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: rgb(0 102 153 / 10%);
  color: var(--color-progressive);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.query-detail__title {
  max-width: 820px;
  margin: 0 0 var(--spacing-150);
  color: #172a3a;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.query-detail__description {
  max-width: 760px;
  margin: 0 0 var(--spacing-300);
  color: var(--color-subtle);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
}
.query-detail__section {
  max-width: 820px;
  margin-bottom: var(--spacing-250);
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid rgb(200 204 209 / 85%);
  border-radius: 16px;
  background: rgb(255 255 255 / 84%);
  box-shadow: 0 5px 16px rgb(32 33 34 / 5%);
}
.query-detail__section-title {
  margin: 0 0 var(--spacing-150);
  color: #172a3a;
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  font-weight: var(--font-weight-bold);
}
.query-detail__text {
  margin: 0;
  color: var(--color-subtle);
  line-height: 1.7;
}
.query-detail__list {
  margin: 0;
  padding-left: var(--spacing-250);
  color: var(--color-subtle);
  line-height: 1.7;
}
.query-detail__list li {
  margin-bottom: var(--spacing-100);
}
.query-detail__guide {
  display: grid;
  gap: var(--spacing-200);
  margin: 0;
  padding: 0;
  list-style-position: inside;
}
.query-detail__guide-step {
  padding: var(--spacing-200);
  border-radius: 12px;
  background: #f7fafc;
}
.query-detail__guide-title {
  display: inline;
  margin: 0;
  color: #172a3a;
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
}
.query-detail__guide-desc {
  margin: var(--spacing-100) 0;
  color: var(--color-subtle);
  line-height: 1.65;
}
.query-detail__code {
  margin: 0;
  padding: var(--spacing-150);
  border: 1px solid rgb(0 102 153 / 18%);
  border-radius: 10px;
  background: #172a3a;
  color: #e5f4fb;
  font-family: var(--font-family-monospace);
  font-size: var(--font-size-small);
  overflow-x: auto;
}
.query-detail__empty {
  padding: var(--spacing-400) 0;
  text-align: center;
}
.query-detail__empty h1 {
  font-size: var(--font-size-large);
  margin-bottom: var(--spacing-150);
}
.query-detail__empty p {
  margin-bottom: var(--spacing-200);
}
</style>
