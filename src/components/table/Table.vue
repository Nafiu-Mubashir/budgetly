<template>
  <div class="relative overflow-scroll md:overflow-visible overflow-y-visible">
    <!-- Conditionally Render Filter Input -->
    <div v-if="filter" class="mb-4 md:w-[30%] ml-auto">
      <Input v-model="filterText" type="text" :placeholder="placeholder" />
    </div>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg"
    >
      <!-- Table Header -->
      <thead
        class="text-xs text-white capitalize font-normal bg-main rounded-lg"
      >
        <tr class="rounded-lg">
          <th class="px-4 py-3 whitespace-nowrap">S/N</th>
          <!-- Serial Number Column -->
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
      <tbody v-if="loading">
        <tr>
          <td
            :colspan="columns.length + 1"
            class="text-center py-4 text-gray-500"
          >
            Loading data.....
            <img
              src="@/assets/loader.png"
              class="h-44 w-44 block mx-auto mt-5 animate-pulse"
              alt=""
            />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-if="filteredData.length > 0"
          v-for="(row, rowIndex) in paginatedData"
          :key="rowIndex"
          class="bg-white border-b hover:bg-main/10 cursor-pointer"
        >
          <!-- Serial Number -->
          <td class="px-4 py-2 whitespace-nowrap">
            {{ (currentPage - 1) * rowsPerPage + rowIndex + 1 }}
          </td>
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-2 whitespace-nowrap capitalize"
          >
            <template v-if="column.key === 'actions'">
              <slot name="actions" :row="row" :id="row.id" />
            </template>
            <template v-else>
              {{ resolveCell(row, column.key) }}
            </template>
          </td>
        </tr>
        <!-- Empty State -->
        <tr v-else>
          <td
            :colspan="columns.length + 1"
            class="text-center py-4 text-gray-500"
          >
            <img
              src="@/assets/no-data.png"
              class="h-44 w-44 block mx-auto mt-5 animate-pulse"
              alt=""
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination Controls -->
  <div class="flex justify-center md:justify-end gap-5 items-center mt-6" v-if="paginate === true">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-2 py-2 bg-main text-white rounded-full disabled:opacity-50 hover:bg-main transition"
      :class="currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
      <ChevronLeft />
    </button>

    <div class="flex space-x-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-2 rounded transition"
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
      class="px-2 py-2 bg-main text-white cursor-pointer rounded-full disabled:opacity-50 hover:bg-main transition"
      :class="
        currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
      "
    >
      <ChevronRight />
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import Input from "../input/Input.vue";
import { commaFormatter } from "@/utils/formatter";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

// Destructure props and extract rowsPerPage
const {
  data,
  columns,
  rowsPerPage = 10,
  filter = false, // Enable or disable filtering
  filterKey = "", // Key to filter by
  paginate = true,
} = defineProps({
  data: { type: Array, required: true, default: () => [] },
  columns: { type: Array, required: true },
  rowsPerPage: { type: Number, default: 10 },
  loading: { type: Boolean, default: false },
  filter: { type: Boolean, default: false },
  filterKey: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  paginate: {type: Boolean, default: true},
});

// State for pagination
const currentPage = ref(1);
const filterText = ref("");

// Total number of pages
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / rowsPerPage)
);

// Filtered data based on the filterText and filterKey
const filteredData = computed(() => {
  if (!filter || !filterText.value) return data;

  const lowercasedFilter = filterText.value.toLowerCase();

  return data.filter((row) =>
    filterKey
      ? row[filterKey]?.toString().toLowerCase().includes(lowercasedFilter)
      : Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(lowercasedFilter)
        )
  );
});

// Paginated data based on the current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredData.value.slice(start, end);
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

// Navigate to a specific page
const goToPage = (page) => {
  currentPage.value = page;
};

// Updated resolveCell function
const resolveCell = (row, key) => {
  const value = key.split(".").reduce((acc, prop) => acc?.[prop], row) || "";

  // Apply commaFormatter if the key matches 'total_amount' or 'amount'
  if (key === "total_amount" || key === "amount" || key === "Total_Amount") {
    return "$" + commaFormatter(value);
  }

  return value;
};
</script>

<style scoped>
/* Responsive table styles for small screens */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }
}
</style>
