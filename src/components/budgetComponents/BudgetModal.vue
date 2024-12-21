<template>
  <Modal
    v-if="isVisible"
    :isVisible="isVisible"
    :title="modalTitle"
    @close="closeModal"
  >
    <template v-if="modalTitle === 'Add New Budget'">
      <form @submit.prevent="handleCreate">
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
          class="w-full p-2 border rounded focus:outline-none border-main focus:shadow-sm focus:shadow-main"
        >
        <option value="" selected disabled>Duration</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button type="submit" class="bg-main text-white px-4 py-2 rounded mt-4">
          Save
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
        <button
          type="submit"
          class="bg-main text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </template>

    <template v-else-if="modalTitle === 'View Budget'">
      <div class="p-3 flex justify-between text-center">
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
      <p class="p-3 mb-4">
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
import { defineProps, defineEmits } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Input from "../input/Input.vue";

// Props passed into the modal
defineProps({
  isVisible: { type: Boolean, required: true },
  modalTitle: { type: String, required: true },
  budgetData: { type: Object, required: true },
});

const emit = defineEmits(["close", "action"]);

const closeModal = () => {
  emit("close");
};

// Action Handlers
const handleCreate = async () => {
  // try {
  //   const response = await axios.post(BUDGET_API, budgetData);
  //   console.log("Budget Created:", response.data);
  //   emit("action", { type: "create", data: response.data });
    closeModal();
    console.log(budgetData);
  // } catch (error) {
  //   console.error("Error creating budget:", error.response?.data || error.message);
  // }
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
