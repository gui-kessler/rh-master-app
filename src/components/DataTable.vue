<template>
  <table>
    <thead class="table-header">
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ t(column.key) }}
        </th>
        <th>{{ t('delete') }}</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr v-for="row in rows" :key="row[identifier]" class="table-row" @click="onSelectRow(row)">
        <td v-for="column in columns" :key="column.key">
          {{ row[column.key] }}
        </td>
        <td class="icon-delete">
          <img @click.stop="deleteAction(row)" src="../assets/delete-icon.svg" alt="Delete" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'DataTable',
  data() {
    return {
      t: useI18n().t,
    };
  },
  props: {
    identifier: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    onSelectRow: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    deleteAction(row) {
      this.$emit('delete', row[this.identifier]);
    },
  },
};
</script>

<style scoped>
.table-header {
  background-color: var(--vt-c-black);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  line-height: 2;
}

.table-body {
  border: 1px solid var(--color-border);
  text-align: center;
  line-height: 3;
}

.table-row {
  border: 1px solid var(--color-border);
}

.table-row:hover {
  background-color: var(--color-hover);
}

table {
  width: 100%;
  border-collapse: collapse;
}

.icon-delete img {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  filter: invert(23%) sepia(89%) saturate(744%) hue-rotate(350deg) brightness(98%) contrast(100%);
  transition: transform 0.2s ease-in-out;
}

.icon-delete img:hover {
  transform: scale(1.2);
}
</style>
