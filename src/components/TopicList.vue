<template>
  <div>
    <cdx-card
      v-for="topic in topics"
      :key="topic.slug"
      class="topic-card"
      :url="`/tematica/${topic.slug}`"
    >
      <template #title>
        {{ $i18n(topic.i18nKey) }}
      </template>
      <template #description>
        {{ $i18n(topic.i18nKey + '-desc') }}
      </template>
      <template #supporting-text>
        {{ $i18n('topic-queries-count', topic.queries.length) }}
      </template>
    </cdx-card>
  </div>
</template>

<script setup>
import { CdxCard } from "@wikimedia/codex";
import { topics } from "../data/topics.js";
</script>

<style scoped>
.topic-card {
  margin-bottom: var( --spacing-200 );
}
</style>
