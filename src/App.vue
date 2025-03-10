<template>
  <header>
    <div class="sidebar">
      <img class="logo" src="./assets/logo.svg" alt="Vue logo" />
      <nav>
        <hr class="solid" />
        <RouterLink to="/">{{ t('home') }}</RouterLink>
        <RouterLink to="/employees">{{ t('employees') }}</RouterLink>
      </nav>
      <div class="language-selector">
        <LanguageSelector />
      </div>
    </div>
  </header>

  <Snackbar />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Snackbar from './components/Snackbar.vue';
import LanguageSelector from './components/LanguageSelector.vue';
import { useI18n } from 'vue-i18n';

export default {
  components: { RouterLink, RouterView, Snackbar, LanguageSelector },
  data() {
    return {
      t: useI18n().t,
    };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  background-color: var(--vt-c-black);
}

nav {
  width: 100%;
  font-size: 12px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  width: 100%;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: start;
  }

  .logo {
    width: 50px;
    height: 50px;
    margin: 1rem 1rem 0 3rem;
  }

  header .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }
}

.language-selector {
  margin-top: auto;
  margin: auto 0 1rem 0.5rem;
}
</style>
