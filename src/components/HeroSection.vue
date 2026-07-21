<template>
  <section class="hero">
    <p class="hero__eyebrow">{{ $i18n('hero-eyebrow') }}</p>
    <h1 class="hero__title">{{ $i18n('hero-title') }}</h1>
    <p class="hero__description">{{ $i18n('hero-description') }}</p>
  </section>
</template>

<style scoped>
.hero {
  padding: var( --spacing-400 ) 0 var( --spacing-300 );
  max-width: 760px;
}
.hero__eyebrow {
  margin-bottom: var( --spacing-100 );
  color: var( --color-progressive );
  font-size: var( --font-size-small );
  font-weight: var( --font-weight-bold );
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hero__title {
  margin: 0 0 var( --spacing-200 );
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  font-weight: var( --font-weight-bold );
}
.hero__description {
  margin: 0;
  color: var( --color-base );
  font-size: var( --font-size-medium );
  line-height: 1.7;
}
</style>
