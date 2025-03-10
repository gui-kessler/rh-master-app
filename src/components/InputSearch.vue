<template>
  <div class="input-search">
    <select v-model="searchBy">
      <option v-for="option in serachByOptions" :key="option" :value="option.field">
        {{ t(option.field) }}
      </option>
    </select>
    <input type="text" v-model="search" @keyup.enter="searchAction" :placeholder="placeholder" />
    <button @click="searchAction">{{ t('search') }}</button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'InputSearch',
  data() {
    return {
      searchBy: '',
      search: '',
      t: useI18n().t,
      placeholder: '',
    };
  },

  props: {
    serachByOptions: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    searchAction() {
      this.$emit('search', this.searchBy, this.search);
    },
  },

  mounted() {
    this.searchBy = this.serachByOptions[0].field;
    this.placeholder = this.t('search');
  },
};
</script>

<style scoped>
.input-search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.input-search input {
  width: 75%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--vt-c-black);
  color: var(--color-text);
  outline: none;
}

.input-search select {
  width: 10%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--vt-c-black);
  color: var(--color-text);
  outline: none;
}

.input-search button {
  width: 10%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--vt-c-black);
  color: var(--color-text);
}

.input-search button:focus {
  outline: none;
}
</style>
