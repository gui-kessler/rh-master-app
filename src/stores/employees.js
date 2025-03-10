import axiosInstance from '@/common/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSnackbarStore } from './snackbar';
import { useI18n } from 'vue-i18n';

export const useEmployeesStore = defineStore('employees', () => {
  const sizesAvailable = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

  const snackbar = useSnackbarStore();
  const { t } = useI18n();

  const employees = ref([]);
  let editPage = ref(false);
  let currentEmployee = ref({});

  async function fetchEmployees(field = 'name', query = '') {
    if (field === 'shirtSize' && !sizesAvailable.includes(query)) {
      snackbar.warning(t('validation.shirtSize'));
      return;
    }

    const queryString = field && query ? `?field=${field}&query=${query}` : '';

    axiosInstance
      .get(`/employees${queryString}`)
      .then((response) => {
        employees.value = response.data;
      })
      .catch((error) => {
        snackbar.error(error.message);
      });
  }

  async function addEmployee(employee) {
    axiosInstance
      .post('/employees', employee)
      .then(() => {
        fetchEmployees();
        snackbar.success(t('snackbar.employeeAdded'));
      })
      .catch((error) => {
        snackbar.error(error.message);
      });

    closeEditPage();
  }

  async function updateEmployee(employee) {
    axiosInstance
      .put(`/employees/${employee.id}`, employee)
      .then(() => {
        fetchEmployees();
        snackbar.success(t('snackbar.employeeUpdated'));
      })
      .catch((error) => {
        snackbar.error(error.message);
      });

    closeEditPage();
  }

  async function removeEmployee(id) {
    if (!id) {
      return;
    }

    axiosInstance
      .delete(`/employees/${id}`)
      .then(() => {
        fetchEmployees();
        snackbar.success(t('snackbar.employeeDeleted'));
      })
      .catch((error) => {
        snackbar.error(error.message);
      });

    closeEditPage();
  }

  function showEditPage(employee) {
    editPage.value = true;
    currentEmployee.value = { ...employee };
  }

  function closeEditPage() {
    editPage.value = false;
    currentEmployee.value = {};
  }

  return {
    employees,
    editPage,
    currentEmployee,
    sizesAvailable,
    addEmployee,
    removeEmployee,
    showEditPage,
    closeEditPage,
    fetchEmployees,
    updateEmployee,
  };
});
