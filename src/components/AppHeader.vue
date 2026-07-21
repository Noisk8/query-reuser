<template>
  <header class="app-header">
    <div class="app-header__inner">
      <router-link to="/" class="app-header__brand">
        {{ $i18n('app-brand') }}
      </router-link>
      <LanguageSelector />
    </div>
  </header>
</template>

<script setup>
import LanguageSelector from "./LanguageSelector.vue";
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgb(255 255 255 / 88%);
  border-bottom: 1px solid rgb(200 204 209 / 75%);
  box-shadow: 0 2px 14px rgb(32 33 34 / 5%);
  backdrop-filter: blur(14px);
}
.app-header__inner {
  width: min(100% - 32px, 1120px);
  min-height: 76px;
  margin: 0 auto;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100);
  color: var(--color-base);
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.03em;
  text-decoration: none;
}
.app-header__brand::before {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--wikidata-blue), var(--wikidata-green));
  box-shadow: 0 0 0 5px rgb(0 102 153 / 10%);
  content: "";
}
</style>
