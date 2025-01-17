<template>
  <div class="md:w-[95%] mx-auto min-h-scree space-y-4">
    <section class="flex justify-between items-center">
      <h1 class="text-base md:text-2xl font-semibold">Budget</h1>
      <button
        @click="openModal('Add New Budget')"
        class="bg-main text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
      >
        Add Budget
      </button>
    </section>
    <!-- Summary Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <DashCard
        title="Total Budgets"
        :value="summary.Total_Budget"
        :icon="WalletMinimal"
      />
      <DashCard
        title="Remaining Budget"
        :value="summary.Remaining_Budget"
        :icon="Wallet"
      />
      <DashCard
        title="Used Budget"
        :value="summary.Used_Budget"
        :icon="FileUp"
      />
      <DashCard
        title="Monthly Allocation"
        :value="summary.Monthly_Allocation"
        :icon="FileDown"
      />
    </div>
    <!-- <div v-if="loading" class="mt-5 text-center">
      Loading budgets...
    </div> -->
    <div class="mt-5 bg-white rounded-lg shadow p-3 md:p-6">
      <Table
        :data="BUDGETS"
        :columns="columns"
        :loading="loading"
         filter
        filterType="select"
        :filterOptions="[
          { label: 'Monthly', value: 'monthly' },
          { label: 'Expense', value: 'expense' },
        ]"
        placeholder="Filter by duration"
      >
        <template #actions="{ row }">
          <Dropdown>
            <ul class="py-1">
              <li>
                <button
                  @click="openModal('Edit Budget', row)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-10"
                >
                  <FilePenLine size="16" />
                  Edit
                </button>
              </li>
              <li>
                <button
                  @click="openModal('View Budget', row)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <Eye size="16" />
                  View
                </button>
              </li>
              <li>
                <button
                  @click="openModal('Delete Budget', row)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  <Trash2 size="16" />
                  Delete
                </button>
              </li>
            </ul>
          </Dropdown>
        </template>
      </Table>
    </div>

    <!-- Modal Manager -->
    <BudgetModal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :modalTitle="modalTitle"
      :budgetData="budgetData"
      @close="closeModal"
      @action="handleModalAction"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import BudgetModal from "@/components/budget/BudgetModal.vue";
import { useStore } from "vuex";
import DashCard from "@/components/cards/DashCard.vue";
import {
  FileDown,
  FileUp,
  Wallet,
  WalletMinimal,
  FilePenLine,
  Eye,
  Trash2,
} from "lucide-vue-next";

const loading = ref(false);
const store = useStore();
// Define reactive variables for modal state
const isModalVisible = ref(false);
const modalTitle = ref(""); // Define modalTitle as a reactive variable
const budgetData = ref({});
const BUDGETS = computed(() => store.getters["budget/budgets"]);
const summary = computed(() => store.getters["dashboard/summary"]);

// Define columns for the table
const columns = [
  // { key: "id", label: "S/N" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Total Amount ($)" },
  { key: "duration", label: "Duration" },
  { key: "actions", label: "Actions" },
];

// Open the modal with a specific title and data
const openModal = async (title, data = {}) => {
  modalTitle.value = title; // Set the modal title
  budgetData.value = { ...data }; // Set the data for the modal
  isModalVisible.value = true; // Show the modal
};

// Close the modal
const closeModal = () => {
  isModalVisible.value = false; // Hide the modal
};

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch("budget/fetchBudgets")
  } catch (error) {
    console.error("Error fetching data:", error);
  }finally{
    loading.value = false
  }
});
</script>
