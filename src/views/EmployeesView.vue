<template>
  <main>
    <div v-if="!store.editPage">
      <label class="title">{{ t('employees') }}</label>
      <button
        style="float: right; font-weight: bold; width: 10rem"
        class="button-primary"
        @click="store.showEditPage({})"
      >
        {{ t('addEmployee') }}
      </button>

      <hr class="solid" />

      <InputSearch
        :serachByOptions="columns.map((column) => ({ label: column.label, field: column.key }))"
        @search="store.fetchEmployees"
      />

      <DataTable
        :identifier="'id'"
        :columns="columns"
        :rows="store.employees"
        :onSelectRow="store.showEditPage"
        @delete="store.removeEmployee"
      />
    </div>
    <div v-else>
      <EditEmployee />
    </div>
  </main>
</template>

<script>
import { useEmployeesStore } from '@/stores/employees';
import DataTable from '@/components/DataTable.vue';
import EditEmployee from '@/components/EditEmployee.vue';
import InputSearch from '@/components/InputSearch.vue';
import { useI18n } from 'vue-i18n';

export default {
  components: { DataTable, EditEmployee, InputSearch },
  name: 'EmployeesView',
  data() {
    return {
      t: useI18n().t,
      store: useEmployeesStore(),
      columns: [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'CPF', key: 'cpf' },
        { label: 'Shirt Size', key: 'shirtSize' },
        { label: 'Shoe Size', key: 'shoeSize' },
      ],
    };
  },
  mounted() {
    this.store.fetchEmployees();
  },
};
</script>
