<template>
  <div class="snackbar" :style="style" v-show="store.visible">
    <div class="snackbar-content">
      <span>{{ store.message }}</span>
      <button @click="store.close">X</button>
    </div>
  </div>
</template>

<script>
import { useSnackbarStore } from '@/stores/snackbar';

export default {
  name: 'SnackBar',
  data() {
    return {
      store: useSnackbarStore(),
    };
  },
  computed: {
    style() {
      return `background-color: ${this.store.color}`;
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out;
}

.snackbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>
