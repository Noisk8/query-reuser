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

    <div class="query-detail__meta">
      <div class="query-detail__meta-item">
        <span class="query-detail__meta-label">
          {{ $i18n('result-' + query.resultType) }}
        </span>
      </div>
      <div class="query-detail__meta-item">
        <span class="query-detail__meta-label">
          {{ $i18n('level-' + query.level) }}
        </span>
      </div>
      <div class="query-detail__meta-item">
        <span class="query-detail__meta-label">{{ $i18n('source') }}</span>
      </div>
    </div>

    <cdx-field class="query-detail__field">
      <template #label>{{ $i18n('select-country') }}</template>
      <cdx-lookup
        v-model:selected="selectedCountry"
        v-model:input-value="countryInput"
        :menu-items="countryMenuItems"
        :placeholder="$i18n('select-country')"
        :menu-config="{ showThumbnail: true, boldLabel: true }"
      />
    </cdx-field>

    <div class="query-detail__section">
      <h2 class="query-detail__section-title">
        {{ $i18n('detail-what-it-does') }}
      </h2>
      <p class="query-detail__text">{{ $i18n(query.i18nKey + '-what-it-does') }}</p>
    </div>

    <div class="query-detail__section">
      <h2 class="query-detail__section-title">
        {{ $i18n('detail-use-cases') }}
      </h2>
      <ul class="query-detail__list">
        <li v-for="i in query.info.useCasesCount" :key="i">
          {{ $i18n(query.i18nKey + '-use-case-' + i) }}
        </li>
      </ul>
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
        {{ $i18n('detail-data-sources') }}
      </h2>
      <ul class="query-detail__list">
        <li v-for="i in query.info.dataSourcesCount" :key="i">
          {{ $i18n(query.i18nKey + '-data-source-' + i) }}
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
import { CdxLookup, CdxField } from "@wikimedia/codex";
import { useI18n } from "vue-banana-i18n";
import { getQueryById, countries } from "../data/topics.js";
import WikidataPlayground from "../components/WikidataPlayground.vue";
import { useCountryLookup } from "../composables/useCountryLookup.js";
import { getCountryName } from "../utils/localeNames.js";

const route = useRoute();
const i18n = useI18n();

const found = getQueryById(route.params.queryId);
const topic = found?.topic ?? null;
const query = found?.query ?? null;

const selectedCountry = ref(route.query.country || "Q298");

const { countryInput, countryMenuItems } = useCountryLookup(selectedCountry);

const displayTitle = computed(() => {
  const country = countries.find((c) => c.id === selectedCountry.value);
  const countryName = country ? getCountryName(country.code, i18n.locale) || country.name : "";
  return i18n.i18n(query.i18nKey + "-title", countryName);
});
</script>

<style scoped>
.query-detail {
  padding: var(--spacing-300) 0;
}
.query-detail__back {
  display: inline-block;
  margin-bottom: var(--spacing-200);
  color: var(--color-progressive);
  text-decoration: none;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
}
.query-detail__back:hover {
  text-decoration: underline;
}
.query-detail__eyebrow {
  margin-bottom: var(--spacing-100);
  color: var(--color-progressive);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.query-detail__title {
  margin: 0 0 var(--spacing-150);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-bold);
}
.query-detail__description {
  max-width: 760px;
  color: var(--color-base);
  font-size: var(--font-size-medium);
  line-height: 1.65;
  margin: 0 0 var(--spacing-300);
}
.query-detail__meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-100);
  margin-bottom: var(--spacing-300);
}
.query-detail__meta-item {
  padding: var(--spacing-100);
  background-color: var(--background-color-interactive-subtle);
  border-radius: var(--border-radius-base);
  text-align: center;
}
.query-detail__meta-label {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-small);
}
.query-detail__field {
  max-width: 360px;
  margin-bottom: var(--spacing-300);
}
.query-detail__section {
  margin-bottom: var(--spacing-300);
  max-width: 760px;
}
.query-detail__section-title {
  margin: 0 0 var(--spacing-150);
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}
.query-detail__text {
  line-height: 1.65;
  color: var(--color-base);
}
.query-detail__list {
  margin: 0;
  padding-left: var(--spacing-250);
  line-height: 1.65;
}
.query-detail__list li {
  margin-bottom: var(--spacing-50);
}
.query-detail__guide {
  margin: 0;
  padding-left: var(--spacing-250);
  line-height: 1.65;
}
.query-detail__guide-step {
  margin-bottom: var(--spacing-200);
}
.query-detail__guide-title {
  margin: 0 0 var(--spacing-50);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
}
.query-detail__guide-desc {
  margin: 0 0 var(--spacing-100);
  color: var(--color-base);
}
.query-detail__code {
  background-color: var(--background-color-interactive-subtle);
  border-left: 4px solid var(--color-progressive);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-100) var(--spacing-150);
  font-family: var(--font-family-monospace);
  font-size: var(--font-size-small);
  overflow-x: auto;
  margin: 0;
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
