<template>
  <div>
    <HeroSection />

    <section class="home-filters">
      <cdx-field class="home-filters__field home-filters__field--wide">
        <template #label>{{ $i18n('search-queries') }}</template>
        <cdx-text-input
          v-model="searchText"
          :start-icon="cdxIconSearch"
          :placeholder="$i18n('search-placeholder')"
          input-type="search"
        />
      </cdx-field>

      <cdx-field class="home-filters__field">
        <template #label>{{ $i18n('select-country') }}</template>
        <cdx-lookup
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
          v-model:selected="selectedTopicSlug"
          :menu-items="topicMenuItems"
          :default-label="$i18n('all-topics')"
          :menu-config="{ boldLabel: true }"
        />
      </cdx-field>
    </section>

    <section v-if="filteredQueries.length" class="home-results">
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

    <section v-else class="home-empty">
      <p>{{ $i18n('no-results') }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { CdxSelect, CdxLookup, CdxField, CdxTextInput } from "@wikimedia/codex";
import { cdxIconSearch } from "@wikimedia/codex-icons";
import HeroSection from "../components/HeroSection.vue";
import QueryCard from "../components/QueryCard.vue";
import { topics } from "../data/topics.js";
import { useQuerySearch } from "../composables/useQuerySearch.js";
import { useCountryLookup } from "../composables/useCountryLookup.js";

const {
  searchText,
  selectedCountry,
  selectedTopicSlug,
  filteredQueries,
} = useQuerySearch();

const { countryInput, countryMenuItems } = useCountryLookup(selectedCountry);

const topicMenuItems = computed(() =>
  topics.map((t) => ({
    label: t.name,
    value: t.slug,
  }))
);
</script>

<style>
.home-filters {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-200);
  margin: var(--spacing-300) 0;
}
@media (min-width: 640px) {
  .home-filters {
    grid-template-columns: repeat(2, 1fr);
  }
  .home-filters__field--wide {
    grid-column: 1 / -1;
  }
}
@media (min-width: 900px) {
  .home-filters {
    grid-template-columns: 2fr 1fr 1fr;
  }
  .home-filters__field--wide {
    grid-column: auto;
  }
}
.home-filters__field {
  min-width: 0;
}
.home-results {
  margin-top: var(--spacing-300);
}
.home-results__header {
  margin-bottom: var(--spacing-200);
}
.home-results__heading {
  margin: 0;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}
.home-empty {
  margin-top: var(--spacing-400);
  text-align: center;
  color: var(--color-subtle);
  font-size: var(--font-size-medium);
}
</style>
