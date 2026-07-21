<template>
  <div>
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
.cdx-container {
  width: min(100% - 32px, 1050px);
  margin: 0 auto;
}
</style>
