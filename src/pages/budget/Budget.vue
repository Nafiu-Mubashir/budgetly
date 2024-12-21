<template>
  <div class="md:w-[95%] mx-auto min-h-screen space-y-3">
    <section class="flex justify-between items-center">
      <h1 class="text-lg font-semibold">Budget</h1>
      <button
        @click="openModal('Add New Budget')"
        class="bg-main text-white px-4 py-2 rounded"
      >
        Add Budget
      </button>
    </section>
    <div class="mt-5">
      <Table :data="tableData" :columns="columns">
        <template #actions="{ row }">
          <Dropdown>
            <ul class="py-1">
              <li>
                <button
                  @click="openModal('Edit Budget', row)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  @click="openModal('View Budget', row)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View
                </button>
              </li>
              <li>
                <button
                  @click="openModal('Delete Budget', row)"
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
import { ref } from "vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import BudgetModal from "@/components/budgetComponents/BudgetModal.vue";

// Define reactive variables for modal state
const isModalVisible = ref(false);
const modalTitle = ref(""); // Define modalTitle as a reactive variable
const budgetData = ref({});

// Example data for the table
const tableData = [
  { id: 1, title: "Food", total_amount: "30000", duration: "monthly" },
  { id: 2, title: "Fuel", total_amount: "20000", duration: "weekly" },
  { id: 3, title: "House Rent", total_amount: "350000", duration: "yearly" },
  {
    id: 4,
    title: "Router Subscription",
    total_amount: "100000",
    duration: "yearly",
  },
  { id: 5, title: "Gym", total_amount: "15000", duration: "monthly" },
];

// Define columns for the table
const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Total Amount" },
  { key: "duration", label: "Duration" },
  { key: "actions", label: "Actions" },
];

// Open the modal with a specific title and data
const openModal = (title, data = {}) => {
  modalTitle.value = title; // Set the modal title
  budgetData.value = { ...data }; // Set the data for the modal
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
    console.log("Creating Budget:", data);
  } else if (type === "edit") {
    console.log("Editing Budget:", data);
  } else if (type === "delete") {
    console.log("Deleting Budget:", data.id);
  }
  closeModal(); // Close the modal after the action
};
</script>

<!-- <style scoped>

.table-container {
  overflow-visible;
}

</style> -->
