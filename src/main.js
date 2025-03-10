import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import messages from './utils/locales/messages';
import { createI18n } from 'vue-i18n';

const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount('#app');
