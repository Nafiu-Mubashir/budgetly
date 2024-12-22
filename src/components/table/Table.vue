<template>
  <div class="relative overflow-scroll md:overflow-visible overflow-y-visible">
    <table
      class="w-full min-h-[65vh text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg"
    >
      <!-- Table Header -->
      <thead class="text-xs text-white capitalize font-normal bg-main rounded-lg">
        <tr class="rounded-lg">
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 whitespace-nowrap"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <!-- Table Body -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in paginatedData"
          :key="rowIndex"
          class="bg-white border-b hover:bg-main/10 cursor-pointer"
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
          <td :colspan="columns.length" class="text-center py-4 text-gray-500">
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination Controls -->
  <!-- <div class="flex justify-between items-center mt-4">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-sm"
    >
      Previous
    </button>
    <p class="text-sm">Page {{ currentPage }} of {{ totalPages }}</p>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-sm"
    >
      Next
    </button>
  </div> -->

   <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-2 py-1 bg-gray-200 text-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Prev
      </button>

      <div class="flex space-x-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="px-3 py-1 rounded transition"
          :class="[
            'text-gray-500 hover:bg-main hover:text-white',
            currentPage === page ? 'bg-main text-white' : 'bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-2 py-1 bg-gray-200 text-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Next
      </button>
    </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";

// Destructure props and extract rowsPerPage
const {
  data,
  columns,
  rowsPerPage = 10,
} = defineProps({
  data: { type: Array, required: true }, // The array of data to render
  columns: { type: Array, required: true }, // Array of column definitions
  rowsPerPage: { type: Number, default: 10 }, // Number of rows per page
});

const goToPage = (page) => {
  currentPage.value = page;
};
// State for pagination
const currentPage = ref(1);

// Total number of pages
const totalPages = computed(() => Math.ceil(data.length / rowsPerPage));

// Paginated data based on the current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return data.slice(start, end);
});

// Navigate to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

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
