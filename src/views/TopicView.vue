<template>
  <section class="topic-view">
    <router-link to="/" class="topic-view__back">
      {{ $i18n('back-home') }}
    </router-link>

    <p class="topic-view__eyebrow">{{ $i18n(topic.i18nKey) }}</p>
    <h1 class="topic-view__title">{{ $i18n(topic.i18nKey + '-title') }}</h1>
    <p class="topic-view__description">{{ $i18n(topic.i18nKey + '-desc') }}</p>

    <cdx-field class="topic-view__field">
      <template #label>{{ $i18n('select-country') }}</template>
      <cdx-lookup
        v-model:selected="selectedCountry"
        v-model:input-value="countryInput"
        :menu-items="countryMenuItems"
        :placeholder="$i18n('select-country')"
        :menu-config="{ showThumbnail: true, boldLabel: true }"
      />
    </cdx-field>

    <QueryCard
      v-for="query in topic.queries"
      :key="query.id"
      :query="query"
      :country-id="selectedCountry"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { CdxLookup, CdxField } from "@wikimedia/codex";
import { getTopicBySlug } from "../data/topics.js";
import QueryCard from "../components/QueryCard.vue";
import { useCountryLookup } from "../composables/useCountryLookup.js";

const route = useRoute();
const topic = getTopicBySlug(route.params.slug);
const selectedCountry = ref("Q298");

const { countryInput, countryMenuItems } = useCountryLookup(selectedCountry);
</script>

<style scoped>
.topic-view {
  padding: var( --spacing-300 ) 0;
}
.topic-view__back {
  display: inline-block;
  margin-bottom: var( --spacing-200 );
  color: var( --color-progressive );
  text-decoration: none;
  font-size: var( --font-size-small );
  font-weight: var( --font-weight-bold );
}
.topic-view__back:hover {
  text-decoration: underline;
}
.topic-view__eyebrow {
  margin-bottom: var( --spacing-100 );
  color: var( --color-progressive );
  font-size: var( --font-size-small );
  font-weight: var( --font-weight-bold );
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.topic-view__title {
  margin: 0 0 var( --spacing-150 );
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: var( --font-weight-bold );
}
.topic-view__description {
  max-width: 760px;
  color: var( --color-base );
  font-size: var( --font-size-medium );
  line-height: 1.65;
  margin: 0 0 var( --spacing-300 );
}
.topic-view__field {
  max-width: 360px;
  margin-bottom: var( --spacing-300 );
}
</style>
