<template>
  <div class="md:w-[95%] mx-auto min-h-scree space-y-4">
    <section class="flex justify-between items-center">
      <h1 class="text-base md:text-2xl font-semibold">Transaction</h1>
      <button
        @click="openModal('Add New Transaction')"
        class="bg-main text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
      >
        Add Transaction
      </button>
    </section>

    <!-- Summary Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <DashCard title="Total Income" :value="summary.Total_Income" />
      <DashCard title="Total Expenses" :value="summary.Total_Expenses" />
      <DashCard
        title="Net Balance"
        :value="summary.Net_Balance"
        :icon="Wallet"
      />
      <DashCard
        title="Total Transactions"
        :value="summary.Total_Transactions"
        :icon="ArrowLeftRight"
      />
    </div>

    <div class="mt-5 bg-white rounded-lg shadow p-3 md:p-6">
      <Table
        :data="transactions"
        :columns="columns"
        :loading="loading"
        filter="true"
        filterKey="category"
        placeholder="Filter by category"
      >
        <template #actions="{ row }">
          <Dropdown>
            <ul class="py-1">
              <li>
                <button
                  @click="openModal('Edit Transaction', row)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <FilePenLine size="16"/>
                  Edit
                </button>
              </li>
              <li>
                <button
                  @click="openModal('View Transaction', row)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <Eye size="16"/>
                  View
                </button>
              </li>
              <li>
                <button
                  @click="openModal('Delete Transaction', row)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  <Trash2 size="16"/>
                  Delete
                </button>
              </li>
            </ul>
          </Dropdown>
        </template>
      </Table>
    </div>

    <!-- Modal Manager -->
    <TransactionModal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :modalTitle="modalTitle"
      :transactionData="transactionData"
      @close="closeModal"
      @action="handleModalAction"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import TransactionModal from "@/components/transaction/TransactionModal.vue";
import { useStore } from "vuex";
import DashCard from "@/components/cards/DashCard.vue";
import {
  Wallet,
  ArrowLeftRight,
  FilePenLine,
  Eye,
  Trash2,
} from "lucide-vue-next";
import { onMounted } from "vue";

const loading = ref(false);
const store = useStore();
// Define reactive variables for modal state
const isModalVisible = ref(false);
const modalTitle = ref(""); // Define modalTitle as a reactive variable
const transactionData = ref({});
const transactions = computed(() => store.getters["transaction/transactions"]);
const summary = computed(() => store.getters["dashboard/summary"]);

const columns = [
  // { key: "id", label: "S/N" },
  { key: "narration", label: "narration" },
  { key: "amount", label: "Total Amount ($)" },
  { key: "category", label: "category" },
  { key: "actions", label: "Actions" },
];

// Open the modal with a specific title and data
const openModal = (title, data = {}) => {
  modalTitle.value = title; // Set the modal title
  transactionData.value = { ...data }; // Set the data for the modal
  isModalVisible.value = true; // Show the modal
};

// Close the modal
const closeModal = () => {
  isModalVisible.value = false; // Hide the modal
};

// Handle actions from the modal (e.g., create, edit, delete)
const handleModalAction = ({ type, data }) => {
  if (type === "create") {
    return data;
  } else if (type === "edit") {
    return data;
  } else if (type === "delete") {
    return data.id;
  }
  closeModal(); // Close the modal after the action
};

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch("transaction/fetchTransactions")
  } catch (error) {
    console.error("Error fetching data:", error);
  }finally{
    loading.value = false
  }
});
</script>
