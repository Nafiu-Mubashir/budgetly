<template>
  <Modal
    v-if="isVisible"
    :isVisible="isVisible"
    :title="modalTitle"
    @close="closeModal"
  >
    <template v-if="modalTitle === 'Add New Budget'">
      <form @submit.prevent="handleCreate">
        <Input v-model="title" type="text" placeholder="Budget title" />
        <Input
          v-model="total_amount"
          type="number"
          placeholder="Total Amount"
        />
        <select
          v-model="duration"
          class="w-full p-2 border text-gray-500 rounded focus:outline-none border-main focus:shadow-sm focus:shadow-main"
        >
          <option selected disabled>Duration</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button
          type="submit"
          class="bg-main text-white px-2 py-3 w-full rounded mt-4"
          :disabled="loading"
        >
          <span v-if="!loading">Add</span>
          <Spinner v-else />
        </button>
      </form>
    </template>

    <template v-else-if="modalTitle === 'Edit Budget'">
      <form @submit.prevent="handleEdit">
        <Input
          v-model="budgetData.title"
          type="text"
          placeholder="Budget Name"
        />
        <Input
          v-model="budgetData.total_amount"
          type="number"
          placeholder="Total Amount"
        />
        <select
          v-model="budgetData.duration"
          class="w-full p-2 border rounded focus:outline-none border-main focus:shadow-md focus:shadow-main"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button type="submit" class="bg-main text-white px-4 py-2 rounded mt-4">
          Update
        </button>
      </form>
    </template>

    <template v-else-if="modalTitle === 'View Budget'">
      <div
        class="p-3 flex flex-col md:flex-row justify-between md:text-center space-y-3 md:space-y-0"
      >
        <div class="flex-col">
          <label class="font-semibold">Title</label>
          <p>{{ budgetData.title }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold">Total Amount</label>
          <p>{{ budgetData.total_amount }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold">Duration</label>
          <p>{{ budgetData.duration }}</p>
        </div>
      </div>
    </template>

    <template v-else-if="modalTitle === 'Delete Budget'">
      <p class="md:p-3 mb-4 text-sm md:text-base">
        Are you sure you want to delete budget:
        <span class="text-main font-semibold">{{ budgetData.title }}</span
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
    </template>
  </Modal>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Input from "../input/Input.vue";
import { useStore } from "vuex";
import Spinner from "../spinner/Spinner.vue";
import { toast } from "vue3-toastify";

// Props passed into the modal
defineProps({
  isVisible: { type: Boolean, required: true },
  modalTitle: { type: String, required: true },
  budgetData: { type: Object, required: true },
});

const emit = defineEmits(["close", "action"]);
const loading = ref(false);
const store = useStore();

const closeModal = () => {
  emit("close");
};
const title = ref("");
const total_amount = ref("");
const duration = ref("");
// Action Handlers
const handleCreate = async () => {
  loading.value = true;
  console.log({
    title: title.value,
    total_amount: total_amount.value,
    duration: duration.value,
  });

  try {
    const response = await store.dispatch("budget/createBudget", {
      title: title.value,
      totalAmount: total_amount.value,
      duration: duration.value,
    });
    if (response.statusCode === "201") {
      toast.success("Budget added successfully");
      closeModal();
    } else {
      toast.error(response.error);
    }
    console.log("Budget Created:", response);
    emit("action", { type: "create", data: response.data });
  } catch (error) {
     toast.error(response.error);
    console.error(
      "Error creating budget:",
      error.response?.data || error.message
    );
  } finally {
    loading.value = false; // Hide the spinner
  }
};

const handleEdit = async () => {
  // try {
  //   const response = await axios.put(`${BUDGET_API}/${budgetData.id}`, budgetData);
  //   console.log("Budget Updated:", response.data);
  //   emit("action", { type: "edit", data: response.data });
  console.log(budgetData);

  // closeModal();
  // } catch (error) {
  //   console.error("Error updating budget:", error.response?.data || error.message);
  // }
};

const handleDelete = async () => {
  // try {
  //   const response = await axios.delete(`${BUDGET_API}/${budgetData.id}`);
  //   console.log("Budget Deleted:", response.data);
  //   emit("action", { type: "delete", data: budgetData });
  closeModal();
  // } catch (error) {
  //   console.error("Error deleting budget:", error.response?.data || error.message);
  // }
};
</script>
