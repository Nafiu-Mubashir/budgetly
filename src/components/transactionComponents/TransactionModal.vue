<template>
  <Modal
    v-if="isVisible"
    :isVisible="isVisible"
    :title="modalTitle"
    @close="closeModal"
  >
    <!-- Add or Edit Transaction -->
    <template
      v-if="
        modalTitle === 'Add New Transaction' ||
        modalTitle === 'Edit Transaction'
      "
    >
      <form @submit.prevent="submitForm">
        <Input
          v-model="formData.narration"
          type="text"
          placeholder="Transaction narration"
        />
        <Input
          v-model="formData.amount"
          type="number"
          placeholder="Total Amount"
        />
        <Select
          v-model="formData.transaction_type"
          :options="dropdownOptions"
          label=""
          placeholder="Select Expenses Type"
          :disabled="false"
          error=""
        />
        <button
          type="submit"
          class="bg-main text-white px-2 py-3 w-full rounded mt-4"
          :disabled="loading"
        >
          <span v-if="!loading">{{
            modalTitle === "Add New Transaction" ? "Add" : "Update"
          }}</span>
          <Spinner v-else />
        </button>
      </form>
    </template>

    <!-- View Transaction -->
    <template v-else-if="modalTitle === 'View Transaction'">
      <div class="p-3 grid grid-cols-2 gap-4">
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Narration</label>
          <p class="text-sm capitalize">{{ transactionData.narration }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Amount</label>
          <p class="text-sm">{{ commaFormatter(transactionData.amount) }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Category</label>
          <p class="text-sm capitalize">{{ transactionData.category }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main"
            >Transaction Type</label
          >
          <p class="text-sm capitalize">
            {{ transactionData.transaction_type }}
          </p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Date Created</label>
          <p class="text-sm">
            {{ shortDateFormatter(transactionData.created_at) }}
          </p>
        </div>
        <div class="flex-col">
          <label class="font-semibold text-sm text-main">Time</label>
          <p class="text-sm">
            {{ timeFormatter(transactionData.created_at, true) }}
          </p>
        </div>
      </div>
    </template>

    <!-- Delete Transaction -->
    <template v-else-if="modalTitle === 'Delete Transaction'">
      <div class="space-y-4">
        <p class="mb-4 text-sm md:text-sm text-center">
          Are you sure you want to delete transaction:
          <span class="text-main font-semibold capitalize">{{
            transactionData.narration
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
  { label: "Income", value: "income" },
  { label: "Expenses", value: "expenses" },
  // { label: "Option 3", value: 3 },
];

// Props passed into the modal
const { transactionData, modalTitle } = defineProps({
  isVisible: { type: Boolean, required: true },
  modalTitle: { type: String, required: true },
  transactionData: { type: Object, required: true },
});

const emit = defineEmits(["close", "action"]);

const store = useStore();
const loading = ref(false);

// Reuse the same form data for create and edit
const formData = ref({ ...transactionData });

const closeModal = () => {
  emit("close");
};

// Submit form for both create and edit
const submitForm = async () => {
  loading.value = true;
  // console.log(formData.value);

  try {
    let response;

    if (modalTitle === "Add New Transaction") {
      // Create Transaction
      response = await store.dispatch("transaction/createTransaction", {
        amount: Number(formData.value.amount),
        transaction_type: formData.value.transaction_type,
        narration: formData.value.narration,
      });
    } else if (modalTitle === "Edit Transaction") {
      // Edit Transaction
      console.log(formData.value, formData.value.id);

      response = await store.dispatch("transaction/updateTransaction", {
        id: formData.value.id,
        amount: Number(formData.value.amount),
        transaction_type: formData.value.transaction_type,
        narration: formData.value.narration,
        budget_id: formData.value.budget_id,
      });
    }

    if (response.statusCode === 200) {
      toast.success(response.message);
      await store.dispatch("transaction/fetchTransactions");
      closeModal();
    }
  } catch (error) {
    toast.error(error.response.data.error);
    console.error(error);
  } finally {
    // await store.dispatch("transaction/fetchTransactions");
    loading.value = false;
  }
};

// Handle delete action
const handleDelete = async () => {
  loading.value = true;

  try {
    const response = await store.dispatch(
      "transaction/deleteTransaction",
      transactionData.id
    );
    console.log(response);

    if (response.statusCode === 200) {
      toast.success(response.message);
      await store.dispatch("transaction/fetchTransactions");
      closeModal();
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error);
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
