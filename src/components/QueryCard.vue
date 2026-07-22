<template>
  <article class="query-card">
    <h2 class="query-card__title">{{ displayTitle }}</h2>

    <p class="query-card__description">{{ $i18n(query.i18nKey + '-desc') }}</p>

    <div v-if="query.adaptationGuide?.length" class="query-card__adapt-preview">
      <h3 class="query-card__adapt-title">{{ $i18n('adapt-title') }}</h3>
      <ul class="query-card__adapt-list">
        <li
          v-for="step in query.adaptationGuide.slice(0, 2)"
          :key="step.step"
          class="query-card__adapt-item"
        >
          <code class="query-card__adapt-code">{{ step.codeSnippet }}</code>
        </li>
      </ul>
      <p v-if="query.adaptationGuide.length > 2" class="query-card__adapt-more">
        +{{ query.adaptationGuide.length - 2 }} {{ $i18n('adapt-more-items') }}
      </p>
    </div>

    <div class="query-card__actions">
      <cdx-button
        weight="primary"
        @click="goToDetail"
      >
        {{ $i18n('btn-view-query-detail') }}
      </cdx-button>    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
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
  position: relative;
  overflow: hidden;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid rgb(200 204 209 / 90%);
  border-radius: 16px;
  background: rgb(255 255 255 / 94%);
  box-shadow: 0 4px 14px rgb(32 33 34 / 5%);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.query-card + .query-card {
  margin-top: var(--spacing-200);
}
.query-card::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(var(--wikidata-blue), var(--wikidata-green));
  content: "";
}
.query-card:hover {
  border-color: rgb(0 102 153 / 35%);
  box-shadow: 0 14px 28px rgb(32 33 34 / 10%);
  transform: translateY(-2px);
}
.query-card__title {
  margin: 0 0 var(--spacing-150);
  color: #172a3a;
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  letter-spacing: -0.015em;
}
.query-card__description {
  max-width: 760px;
  margin: 0 0 var(--spacing-250);
  color: var(--color-subtle);
  line-height: 1.7;
}
.query-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-100);
}
.query-card__adapt-preview {
  margin-bottom: var(--spacing-200);
  padding: var(--spacing-150);
  border: 1px solid rgb(0 102 153 / 15%);
  border-radius: 10px;
  background: rgb(0 102 153 / 5%);
}
.query-card__adapt-title {
  margin: 0 0 var(--spacing-100);
  color: #172a3a;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
}
.query-card__adapt-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.query-card__adapt-item {
  margin-bottom: var(--spacing-75);
}
.query-card__adapt-item:last-child {
  margin-bottom: 0;
}
.query-card__adapt-code {
  display: block;
  padding: var(--spacing-75);
  border: 1px solid rgb(200 204 209 / 60%);
  border-radius: 6px;
  background: #ffffff;
  color: #172a3a;
  font-family: var(--font-family-monospace);
  font-size: 0.85rem;
  line-height: 1.4;
}
.query-card__adapt-more {
  margin: var(--spacing-100) 0 0;
  color: var(--color-progressive);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
}
</style>
