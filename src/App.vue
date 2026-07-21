<template>
  <div class="app-shell">
    <AppHeader />
    <main class="cdx-container">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<style>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.cdx-container {
  width: min(100% - 32px, 1120px);
  flex: 1;
  margin: 0 auto;
}
</style>
