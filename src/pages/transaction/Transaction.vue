<template>
  <div
    class="md:w-[95%] mx-auto min-h-scree space-y-4"
  >
    <section class="flex justify-between items-center">
      <h1 class="text-base md:text-lg font-semibold">Transaction</h1>
      <button
        @click="openModal('Add New Transaction')"
        class="bg-main text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
      >
        Add Transaction
      </button>
    </section>

    <div class="mt-5 bg-white rounded-lg shadow p-3 md:p-6">
      <Table :data="tableData" :columns="columns">
        <template #actions="{ row }">
          <Dropdown>
            <ul class="py-1">
              <li>
                <button
                  @click="openModal('Edit Transaction', row)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  @click="openModal('View Transaction', row)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View
                </button>
              </li>
              <li>
                <button
                  @click="openModal('Delete Transaction', row)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
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
import { ref } from "vue";
import CreateTransaction from "@/components/transactionComponents/CreateTransaction.vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import TransactionModal from "@/components/transactionComponents/TransactionModal.vue";

// Define reactive variables for modal state
const isModalVisible = ref(false);
const modalTitle = ref(""); // Define modalTitle as a reactive variable
const transactionData = ref({});

const tableData = [
  { id: 1, category: "Debit", total_amount: "30,000", narration: "Food Items" },
  { id: 2, category: "Debit", total_amount: "20,000", narration: "Fuel" },
  { id: 3, category: "Debit", total_amount: "35,000", narration: "House Rent" },
  {
    id: 4,
    category: "Debit",
    total_amount: "100,000",
    narration: "Subscription Fee",
  },
  {
    id: 5,
    category: "Debit",
    total_amount: "15,000",
    narration: "Gym Payment",
  },
  { id: 6, category: "Credit", total_amount: "1,000,000", narration: "Salary" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "narration", label: "narration" },
  { key: "total_amount", label: "Total Amount ($)" },
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
  console.log(`Action: ${type}`, data);
  if (type === "create") {
    console.log("Creating Transaction:", data);
  } else if (type === "edit") {
    console.log("Editing Transaction:", data);
  } else if (type === "delete") {
    console.log("Deleting Transaction:", data.id);
  }
  closeModal(); // Close the modal after the action
};
</script>
