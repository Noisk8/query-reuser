<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      {{ $i18n('footer-text') }}
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: var(--spacing-400);
  padding: var(--spacing-300) 0;
  border-top: 1px solid rgb(200 204 209 / 80%);
  background: rgb(255 255 255 / 60%);
  color: var(--color-subtle);
  font-size: var(--font-size-small);
}
.app-footer__inner {
  width: min(100% - 32px, 1120px);
  margin: 0 auto;
}
</style>
