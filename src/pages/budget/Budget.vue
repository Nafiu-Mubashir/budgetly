<template>
  <div class="md:w-[95%] mx-auto min-h-scree space-y-4">
    <section class="flex justify-between items-center">
      <h1 class="text-lg font-semibold">Budget</h1>
      <button
        @click="openModal('Add New Budget')"
        class="bg-main text-white px-2 md:px-4 py-2 rounded text-sm md:text-base"
      >
        Add Budget
      </button>
    </section>
    <!-- <div v-if="loading" class="mt-5 text-center">
      Loading budgets...
    </div> -->
    <div class="mt-5 bg-white rounded-lg shadow p-3 md:p-6">
      <Table :data="BUDGETS" :columns="columns" :loading="loading">
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
import { computed, onMounted, ref } from "vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import BudgetModal from "@/components/budgetComponents/BudgetModal.vue";
import { useStore } from "vuex";

const loading = ref(true);
const store = useStore();
// Define reactive variables for modal state
const isModalVisible = ref(false);
const modalTitle = ref(""); // Define modalTitle as a reactive variable
const budgetData = ref({});
const BUDGETS = computed(() => store.getters["budget/budgets"]);
console.log("This is the budget array: ", BUDGETS);

// Example data for the table
const tableData = [
 
];

// Define columns for the table
const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Total Amount ($)" },
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

// Fetch budgets on component mount
const fetchBudgets = async () => {
  try {
    await store.dispatch("budget/fetchBudgets");
  } catch (error) {
    console.error("Error fetching budgets:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBudgets);
</script>

<!-- <style scoped>

.table-container {
  overflow-visible;
}

</style> -->
