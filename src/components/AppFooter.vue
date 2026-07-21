<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      {{ $i18n('footer-text') }}
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: var( --spacing-200 ) 0;
  border-top: 1px solid var( --border-color-base );
  color: var( --color-subtle );
  font-size: var( --font-size-small );
}
.app-footer__inner {
  width: min(100% - 32px, 1050px);
  margin: 0 auto;
}
</style>
