<template>
  <section class="hero">
    <p class="hero__subtitle">{{ $i18n('hero-title') }}</p>
    <p class="hero__description">{{ $i18n('hero-description') }}</p>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  max-width: 900px;
  margin-top: 40px;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid rgb(200 204 209 / 80%);
  border-radius: 20px;
  background:
    radial-gradient(circle at 92% 10%, rgb(51 153 102 / 16%), transparent 13rem),
    linear-gradient(135deg, #ffffff, #f7fbfd);
  box-shadow: 0 16px 36px rgb(32 33 34 / 8%);
}
.hero::after {
  position: absolute;
  right: -2rem;
  bottom: -3rem;
  width: 10rem;
  height: 10rem;
  border: 20px solid rgb(0 102 153 / 8%);
  border-radius: 50%;
  content: "";
}
.hero__subtitle {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 0 var(--spacing-150);
  color: #172a3a;
  font-size: clamp(1.5rem, 3.2vw, 2.25rem);
  line-height: 1.18;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.025em;
}
.hero__description {
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0;
  color: var(--color-subtle);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
}
</style>
