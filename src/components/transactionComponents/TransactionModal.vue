<template>
  <Modal
    v-if="isVisible"
    :isVisible="isVisible"
    :title="modalTitle"
    @close="closeModal"
  >
    <template v-if="modalTitle === 'Add New Transaction'">
      <form @submit.prevent="handleCreate">
        <Input
          v-model="transactionData.category"
          type="text"
          placeholder="Transaction Name"
        />
        <Input
          v-model="transactionData.total_amount"
          type="number"
          placeholder="Total Amount"
        />
         <Input
          v-model="transactionData.narration"
          type="text"
          placeholder="Narration"
        />
        <button type="submit" class="bg-main text-white px-4 py-2 rounded mt-4">
          Save
        </button>
      </form>
    </template>

    <template v-else-if="modalTitle === 'Edit Transaction'">
      <form @submit.prevent="handleEdit">
        <Input
          v-model="transactionData.category"
          type="text"
          placeholder="Transaction Name"
        />
        <Input
          v-model="transactionData.total_amount"
          type="text"
          placeholder="Total Amount"
        />
          <Input
          v-model="transactionData.narration"
          type="text"
          placeholder="Narration"
        />
        <button type="submit" class="bg-main text-white px-4 py-2 rounded mt-4">
          Update
        </button>
      </form>
    </template>

    <template v-else-if="modalTitle === 'View Transaction'">
      <div
        class="p-3 flex flex-col md:flex-row justify-between md:text-center space-y-3 md:space-y-0"
      >
        <div class="flex-col">
          <label class="font-semibold">Title</label>
          <p>{{ transactionData.category }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold">Total Amount</label>
          <p>{{ transactionData.total_amount }}</p>
        </div>
        <div class="flex-col">
          <label class="font-semibold">Duration</label>
          <p>{{ transactionData.narration }}</p>
        </div>
      </div>
    </template>

    <template v-else-if="modalTitle === 'Delete Transaction'">
      <p class="md:p-3 mb-4 text-sm md:text-base">
        Are you sure you want to delete transaction:
        <span class="text-main font-semibold">{{ transactionData.category }}</span
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
  transactionData: { type: Object, required: true },
});

const emit = defineEmits(["close", "action"]);

const closeModal = () => {
  emit("close");
};

// Action Handlers
const handleCreate = async () => {
  // try {
  //   const response = await axios.post(Transaction_API, transactionData);
  //   console.log("Transaction Created:", response.data);
  //   emit("action", { type: "create", data: response.data });
  closeModal();
  console.log(transactionData);
  // } catch (error) {
  //   console.error("Error creating Transaction:", error.response?.data || error.message);
  // }
};

const handleEdit = async () => {
  // try {
  //   const response = await axios.put(`${Transaction_API}/${transactionData.id}`, transactionData);
  //   console.log("Transaction Updated:", response.data);
  //   emit("action", { type: "edit", data: response.data });
  console.log(transactionData);

  // closeModal();
  // } catch (error) {
  //   console.error("Error updating Transaction:", error.response?.data || error.message);
  // }
};

const handleDelete = async () => {
  // try {
  //   const response = await axios.delete(`${Transaction_API}/${transactionData.id}`);
  //   console.log("Transaction Deleted:", response.data);
  //   emit("action", { type: "delete", data: transactionData });
  closeModal();
  // } catch (error) {
  //   console.error("Error deleting Transaction:", error.response?.data || error.message);
  // }
};
</script>
