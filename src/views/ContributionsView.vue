<template>
  <section class="contributions">
    <router-link to="/" class="contributions__back">
      {{ $i18n('back-home') }}
    </router-link>

    <h1 class="contributions__title">{{ $i18n('contributions-title') }}</h1>
    <p class="contributions__description">{{ $i18n('contributions-desc') }}</p>

    <div class="contributions__section">
      <h2 class="contributions__section-title">{{ $i18n('contributions-how-title') }}</h2>
      <p class="contributions__text">{{ $i18n('contributions-how-desc') }}</p>
      <p class="contributions__text">{{ $i18n('contributions-how-cta') }}</p>
    </div>

    <div class="contributions__section">
      <h2 class="contributions__section-title">{{ $i18n('contributions-include-title') }}</h2>
      <ul class="contributions__list">
        <li>{{ $i18n('contributions-include-1') }}</li>
        <li>{{ $i18n('contributions-include-2') }}</li>
        <li>{{ $i18n('contributions-include-3') }}</li>
        <li>{{ $i18n('contributions-include-4') }}</li>
        <li>{{ $i18n('contributions-include-5') }}</li>
        <li>{{ $i18n('contributions-include-6') }}</li>
        <li>{{ $i18n('contributions-include-7') }}</li>
      </ul>
    </div>

    <div class="contributions__cta">
      <cdx-button
        weight="primary"
        @click="openWikidataDiscussion"
      >
        {{ $i18n('contributions-cta-button') }}
      </cdx-button>
      <p class="contributions__cta-hint">{{ $i18n('contributions-cta-hint') }}</p>
    </div>
  </section>
</template>

<script setup>
import { CdxButton } from "@wikimedia/codex";

function openWikidataDiscussion() {
  window.open(
    "https://www.wikidata.org/w/index.php?title=Wikidata_talk:Tools/query-reuser&action=edit&section=new",
    "_blank",
    "noopener,noreferrer"
  );
}
</script>

<style scoped>
.contributions {
  max-width: 820px;
  padding: clamp(1.5rem, 4vw, 3rem) 0 var(--spacing-500);
}
.contributions__back {
  display: inline-flex;
  align-items: center;
  margin-bottom: var(--spacing-300);
  color: var(--color-progressive);
  text-decoration: none;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
}
.contributions__back:hover {
  text-decoration: underline;
}
.contributions__title {
  max-width: 820px;
  margin: 0 0 var(--spacing-150);
  color: #172a3a;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.contributions__description {
  max-width: 760px;
  margin: 0 0 var(--spacing-300);
  color: var(--color-subtle);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
}
.contributions__section {
  margin-bottom: 28px;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid rgb(200 204 209 / 85%);
  border-radius: 16px;
  background: rgb(255 255 255 / 84%);
  box-shadow: 0 5px 16px rgb(32 33 34 / 5%);
}
.contributions__section-title {
  margin: 0 0 var(--spacing-150);
  color: #172a3a;
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  font-weight: var(--font-weight-bold);
}
.contributions__text {
  margin: 0 0 var(--spacing-150);
  color: var(--color-subtle);
  line-height: 1.7;
}
.contributions__text:last-child {
  margin-bottom: 0;
}
.contributions__list {
  margin: 0;
  padding-left: var(--spacing-250);
  color: var(--color-subtle);
  line-height: 1.7;
}
.contributions__list li {
  margin-bottom: var(--spacing-100);
}
.contributions__list li:last-child {
  margin-bottom: 0;
}
.contributions__cta {
  text-align: center;
  padding: var(--spacing-300);
  border: 2px dashed var(--color-progressive);
  border-radius: 16px;
  background: rgb(0 102 153 / 5%);
}
.contributions__cta-hint {
  margin: var(--spacing-150) 0 0;
  color: var(--color-subtle);
  font-size: var(--font-size-small);
}
</style>
