<template>
  <main>
    <div>
      <label class="title">{{ title }}</label>
    </div>

    <hr class="solid" />

    <div style="display: flex">
      <div>
        <div class="user-img">
          <img src="../assets/user.svg" alt="User" />
        </div>
      </div>
      <div class="right">
        <div>
          <label>{{ t('name') }}:</label>
          <input style="width: 500px" v-model="store.currentEmployee.name" />
        </div>
        <div>
          <label>{{ t('email') }}:</label>
          <input style="width: 300px" v-model="store.currentEmployee.email" />
        </div>
        <div>
          <label>{{ t('cpf') }}:</label>
          <input style="width: 150px" v-model="store.currentEmployee.cpf" />
        </div>
        <div>
          <label>{{ t('shirtSize') }}:</label>
          <select style="width: 70px; text-align: center" v-model="store.currentEmployee.shirtSize">
            <option v-for="size in store.sizesAvailable" :value="size" :key="size">
              {{ size }}
            </option>
          </select>
        </div>
        <div>
          <label>{{ t('shoeSize') }}:</label>
          <input style="width: 80px; text-align: center" v-model="store.currentEmployee.shoeSize" />
        </div>
      </div>
    </div>

    <div class="actions">
      <button
        v-if="store.currentEmployee.id"
        class="button-delete"
        @click="store.removeEmployee(store.currentEmployee.id)"
      >
        {{ t('delete') }}
      </button>
      <button class="button-secundary" @click="store.closeEditPage(null)">{{ t('cancel') }}</button>
      <button class="button-primary" @click="save" style="width: 10rem">
        {{ t('save') }}
      </button>
    </div>
  </main>
</template>

<script>
import { useEmployeesStore } from '@/stores/employees';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';

export default {
  name: 'EditEmployee',
  data() {
    return {
      t: useI18n().t,
      store: useEmployeesStore(),
      snackbar: useSnackbarStore(),
    };
  },
  computed: {
    title() {
      return this.store.currentEmployee.id ? this.t('editEmployee') : this.t('addEmployee');
    },
  },
  methods: {
    save() {
      this.store.currentEmployee.shoeSize = parseInt(this.store.currentEmployee.shoeSize);

      try {
        this.validateForm(this.store.currentEmployee);
      } catch (error) {
        this.snackbar.warning(error.message);
        return;
      }

      this.store.currentEmployee.id
        ? this.store.updateEmployee(this.store.currentEmployee)
        : this.store.addEmployee(this.store.currentEmployee);
    },
    validateForm(employee) {
      if (
        !employee.shoeSize ||
        !employee.shirtSize ||
        !employee.name ||
        !employee.email ||
        !employee.cpf
      ) {
        throw new Error(this.t('validation.fillAllFields'));
      }

      if (employee.shoeSize < 28 || employee.shoeSize > 52) {
        throw new Error(this.t('validation.shoeSize'));
      }

      if (employee.name.length < 3 || employee.name.length > 100) {
        throw new Error(this.t('validation.name'));
      }

      if (employee.email.length < 3 || employee.email.length > 100) {
        throw new Error(this.t('validation.email'));
      }

      if (!employee.email.includes('@') || !employee.email.includes('.')) {
        throw new Error(this.t('validation.emailInvalid'));
      }

      if (employee.cpf.length !== 14) {
        throw new Error(this.t('validation.cpf'));
      }
    },
  },
};
</script>

<style scoped>
input {
  background-color: var(--vt-c-black);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  outline: none;
  line-height: 2;
  font-size: medium;
}

select {
  background-color: var(--vt-c-black);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  outline: none;
}

label {
  display: inline-block;
  margin-right: 1rem;
  margin-left: 3rem;
  text-align: right;
  min-width: 150px;
}

button {
  margin: 0 1rem 0 1rem;
}

.actions {
  align-self: flex-end;
}

.user-img {
  margin: 0 0 1rem 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28rem;
  height: 28rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--vt-c-black);
}

.user-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  margin: 5rem 0 0 8rem;
  display: flex;
  flex-direction: column;
}
</style>
