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
  background-color: var( --background-color-base );
  border-bottom: 1px solid var( --border-color-base );
}
.app-header__inner {
  width: min(100% - 32px, 1050px);
  margin: 0 auto;
  padding: var( --spacing-200 ) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-header__brand {
  font-size: var( --font-size-large );
  font-weight: var( --font-weight-bold );
  color: var( --color-base );
  text-decoration: none;
}
</style>
