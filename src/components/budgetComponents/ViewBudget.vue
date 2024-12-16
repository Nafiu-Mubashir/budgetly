<template>
  <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="block w-full text-left hover:bg-gray-100"
    >
      View
    </button>

    <!-- Reusable Modal -->
    <Modal
      :isVisible="showModal"
      title="View Budget"
      @close="showModal = false"
    >
      <form @submit.prevent="editBudget" class="bg-white">
        <div class="w-full mx-auto space-y-4 flex flex-col justify-center">
          <!-- Display full userData object -->
          <p class="text-gray-700 text-sm">{{ userData.row.title }}</p>
          <p class="text-gray-700 text-sm">{{ userData.row.total_amount }}</p>
          <p class="text-gray-700 text-sm">{{ userData.row.duration }}</p>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/modal/Modal.vue";

// Define props
defineProps({
  userData: {
    type: Object,
    required: false,
  },
});

// Reactive modal visibility
const showModal = ref(false);
</script>
