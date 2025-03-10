import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
  const visible = ref(false);
  const message = ref('');
  const color = ref('#66bb6a');

  function warning(newMessage, timeout = 2000) {
    showSnackbar('#f57c00', newMessage, timeout);
  }

  function error(newMessage, timeout = 2000) {
    showSnackbar('#f44336', newMessage, timeout);
  }

  function success(newMessage, timeout = 2000) {
    showSnackbar('#66bb6a', newMessage, timeout);
  }

  function close() {
    visible.value = false;
  }

  function showSnackbar(newColor, newMessage, timeout) {
    visible.value = true;
    color.value = newColor;
    message.value = newMessage;

    setTimeout(() => {
      visible.value = false;
    }, timeout);
  }

  return {
    visible,
    message,
    color,
    warning,
    error,
    success,
    close,
  };
});
