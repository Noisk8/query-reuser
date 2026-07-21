<template>
  <div>
    <HeroSection />

    <section class="home-filters" aria-label="Filtros de consultas">
      <cdx-field class="home-filters__field">
        <template #label>{{ $i18n('select-country') }}</template>
        <cdx-lookup
          class="home-filters__control"
          v-model:selected="selectedCountry"
          v-model:input-value="countryInput"
          :menu-items="countryMenuItems"
          :placeholder="$i18n('select-country')"
          :menu-config="{ showThumbnail: true, boldLabel: true }"
        />
      </cdx-field>

      <cdx-field class="home-filters__field">
        <template #label>{{ $i18n('select-topic') }}</template>
        <cdx-select
          class="home-filters__control"
          v-model:selected="selectedTopicSlug"
          :menu-items="topicMenuItems"
          :default-label="$i18n('all-topics')"
          :menu-config="{ boldLabel: true }"
        />
      </cdx-field>
    </section>

    <section v-if="hasSearchCriteria && filteredQueries.length" class="home-results">
      <div class="home-results__header">
        <h2 class="home-results__heading">
          {{ $i18n('results-count', filteredQueries.length) }}
        </h2>
      </div>

      <QueryCard
        v-for="{ query } in filteredQueries"
        :key="query.id"
        :query="query"
        :country-id="selectedCountry"
      />
    </section>

    <section v-else-if="hasSearchCriteria" class="home-empty">
      <p>{{ $i18n('no-results') }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { CdxSelect, CdxLookup, CdxField } from "@wikimedia/codex";
import HeroSection from "../components/HeroSection.vue";
import QueryCard from "../components/QueryCard.vue";
import { topics } from "../data/topics.js";
import { useQuerySearch } from "../composables/useQuerySearch.js";
import { useCountryLookup } from "../composables/useCountryLookup.js";

const { selectedCountry, selectedTopicSlug, filteredQueries } = useQuerySearch();

const { countryInput, countryMenuItems } = useCountryLookup(selectedCountry);

const topicMenuItems = computed(() =>
  topics.map((t) => ({
    label: t.name,
    value: t.slug,
  }))
);

const hasSearchCriteria = computed(() =>
  Boolean(selectedCountry.value || selectedTopicSlug.value)
);
</script>

<style>
.home-filters {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--spacing-250);
  max-width: 900px;
  margin: 36px 0 56px;
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid rgb(200 204 209 / 90%);
  border-radius: 18px;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 12px 30px rgb(32 33 34 / 8%);
}
.home-filters > .cdx-field.home-filters__field {
  min-width: 0;
  margin: 0;
  align-self: start;
}
.home-filters__field :is(label, .cdx-label) {
  color: #374151;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.01em;
}
.home-filters__control {
  display: block;
  width: 100% !important;
}
.home-results {
  max-width: 960px;
  margin: 0 0 56px;
}
.home-results__header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-250);
}
.home-results__heading {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100);
  margin: 0;
  color: #172a3a;
  font-size: clamp(1.125rem, 2vw, 1.4rem);
  font-weight: var(--font-weight-bold);
}
.home-results__heading::before {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--wikidata-green);
  box-shadow: 0 0 0 5px rgb(51 153 102 / 12%);
  content: "";
}
.home-empty {
  max-width: 760px;
  margin: var(--spacing-400) 0;
  padding: var(--spacing-400);
  border: 1px dashed var(--border-color-base);
  border-radius: 16px;
  background: rgb(255 255 255 / 65%);
  text-align: center;
  color: var(--color-subtle);
  font-size: var(--font-size-medium);
}
@media (min-width: 640px) {
  .home-filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--spacing-300);
  }
}
</style>
