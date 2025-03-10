<template>
  <div class="language-selector">
    <div v-if="showDropdown" class="dropdown">
      <div
        v-for="lang in languages"
        :key="lang.code"
        class="dropdown-item"
        @click="changeLanguage(lang.code)"
      >
        <img :src="getFlag(lang.code)" :alt="lang.code" />
        <span>{{ lang.label }}</span>
      </div>
    </div>
    <div class="selected-lang" @click="toggleDropdown">
      <img :src="getFlag(langSelected)" :alt="langSelected" />
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'LanguageSelector',
  data() {
    return {
      locale: useI18n().locale,
      langSelected: useI18n().locale.value,
      showDropdown: false,
      languages: [
        { code: 'en', label: 'English' },
        { code: 'br', label: 'Português' },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    changeLanguage(lang) {
      this.locale = lang;
      this.langSelected = lang;
      this.showDropdown = false;
    },
    getFlag(lang) {
      return new URL(`../assets/icon-flag-${lang}.svg`, import.meta.url).href;
    },
  },
};
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.selected-lang {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid white;
}

.selected-lang img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown {
  position: absolute;
  bottom: 50px;
  background: #333;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.dropdown-item img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
