<template>
  <main>
    <label class="title">{{ t('home') }}</label>
    <hr class="solid" />
    <p style="margin-top: 1rem">{{ t('homeDescription') }}</p>
  </main>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'HomeView',
  data() {
    return {
      t: useI18n().t,
    };
  },
};
</script>
