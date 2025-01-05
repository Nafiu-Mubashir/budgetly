<template>
  <Modal
    v-if="isVisible"
    :isVisible="isVisible"
    :title="modalTitle"
    @close="closeModal"
  >
    <!-- Add or Edit Budget -->
    <template
      v-if="modalTitle === 'Add New Budget' || modalTitle === 'Edit Budget'"
    >
      <form @submit.prevent="submitForm">
        <Input
          v-model="formData.title"
          type="text"
          placeholder="Budget title"
        />
        <Input
          v-model="formData.total_amount"
          type="number"
          placeholder="Total Amount"
        />

        <Select
          v-model="formData.duration"
          :options="dropdownOptions"
          label=""
          placeholder="Select a Duration"
          :disabled="false"
          error=""
        />
        <button
          type="submit"
          class="bg-main text-white px-2 py-3 w-full rounded mt-4"
          :disabled="loading"
        >
          <span v-if="!loading">{{
            modalTitle === "Add New Budget" ? "Add" : "Update"
          }}</span>
          <Spinner v-else />
        </button>
      </form>
    </template>

    <!-- View Budget -->
    <template v-else-if="modalTitle === 'View Budget'">
      <div class="p-3 grid grid-cols-2 gap-4">
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Title</label>
          <p class="text-sm capitalize">{{ budgetData.title }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Amount</label>
          <p class="text-sm">{{ commaFormatter(budgetData.total_amount) }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Duration</label>
          <p class="text-sm capitalize">{{ budgetData.duration }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Date Created</label>
          <p class="text-sm">{{ shortDateFormatter(budgetData.created_at) }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Time</label>
          <p class="text-sm">
            {{ timeFormatter(budgetData.created_at, true) }}
          </p>
        </div>
      </div>
    </template>

    <!-- Delete Budget -->
    <template v-else-if="modalTitle === 'Delete Budget'">
      <div class="space-y-4">
        <p class="mb-4 text-sm md:text-sm text-center">
          Are you sure you want to delete budget:
          <span class="text-main font-semibold capitalize">{{
            budgetData.title
          }}</span
          >?
        </p>
        <div class="flex justify-between">
          <button
            @click="handleDelete"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Input from "../input/Input.vue";
import Spinner from "../spinner/Spinner.vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import {
  commaFormatter,
  shortDateFormatter,
  timeFormatter,
} from "@/utils/formatter";
import Select from "@/components/selectInput/Select.vue";

const dropdownOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Yearly", value: "yearly" },
];

// Props passed into the modal
const { budgetData, modalTitle } = defineProps({
  isVisible: { type: Boolean, required: true },
  modalTitle: { type: String, required: true },
  budgetData: { type: Object, required: true },
});

const emit = defineEmits(["close", "action"]);

const store = useStore();
const loading = ref(false);

// Reuse the same form data for create and edit
const formData = ref({ ...budgetData });

const closeModal = () => {
  emit("close");
};

// Submit form for both create and edit
const submitForm = async () => {
  loading.value = true;

  try {
    let response;

    if (modalTitle === "Add New Budget") {
      // Create Budget
      response = await store.dispatch("budget/createBudget", formData.value);
    } else if (modalTitle === "Edit Budget") {
      // Edit Budget
      response = await store.dispatch("budget/updateBudget", {
        id: formData.value.id,
        total_amount: Number(formData.value.total_amount),
        duration: formData.value.duration,
        title: formData.value.title,
      });
    }

    if (response.statusCode === 200) {
      toast.success(response.message);
      await store.dispatch("budget/fetchBudgets");
      await store.dispatch("dashboard/fetchSummary");
      await store.dispatch("dashboard/fetchMonthlySummary");
      closeModal();
    }
  } catch (error) {
    toast.error(error.response.data.error);
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// Handle delete action
const handleDelete = async () => {
  loading.value = true;

  try {
    const response = await store.dispatch("budget/deleteBudget", budgetData.id);
    if (response.statusCode === 200) {
      toast.success(response.message);
      await store.dispatch("budget/fetchBudgets");
      await store.dispatch("dashboard/fetchSummary");
      await store.dispatch("dashboard/fetchMonthlySummary");
      closeModal();
    } else {
      toast.error(response.error);
    }
    // emit("action", { type: "delete", id: budgetData.id });
  } catch (error) {
    toast.error(error.response.data.error);
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
