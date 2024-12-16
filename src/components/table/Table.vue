<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <!-- Table Header -->
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="">
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 whitespace-nowrap"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <!-- Table Body -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-2 whitespace-nowrap"
          >
            <!-- Check if the column is 'actions', use slot -->
            <template v-if="column.key === 'actions'">
              <slot name="actions" :row="row" :id="row.id" />
            </template>
            <!-- Default rendering for other columns -->
            <template v-else>
              {{ resolveCell(row, column.key) }}
            </template>
          </td>
        </tr>
        <!-- Empty State -->
        <tr v-if="data.length === 0">
          <td
            :colspan="columns.length"
            class="text-center py-4 text-gray-500"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  data: { type: Array, required: true }, // The array of data to render
  columns: { type: Array, required: true }, // Array of column definitions
});

/**
 * Resolves the cell content based on the column key
 * Supports nested properties (e.g., "user.name")
 */
const resolveCell = (row, key) => {
  return key.split(".").reduce((acc, prop) => acc?.[prop], row) || "";
};
</script>

<style scoped>
/* Responsive table styles for small screens */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem; /* Smaller font size for mobile */
  }
}
</style>
