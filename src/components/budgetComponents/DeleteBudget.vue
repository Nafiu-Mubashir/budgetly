<template>
  <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
    >
      Delete
    </button>

    <!-- Reusable Modal -->
    <Modal
      :isVisible="showModal"
      title="Delete Budget"
      @close="showModal = false"
    >
      <form @submit.prevent="editBudget" class="bg-white">
        <div class="w-full mx-auto space-y-8 flex flex-col justify-center">
          <p class="text-center p-6">
            Are you sure you want to delete this {{ title }}?
          </p>
          <div class="flex justify-between gap-3">
            <button
              type="submit"
              class="w-auto bg-main text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              @click="showModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/modal/Modal.vue";

// Destructure props
const { id, title } = defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
});

// State for modal visibility
const showModal = ref(false);

// Function to handle edit action
const editBudget = () => {
  console.log("Editing Budget with ID:", id);
};
</script>
