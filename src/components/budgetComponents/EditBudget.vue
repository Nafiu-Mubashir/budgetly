<template>
  <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      Edit
    </button>

    <!-- Reusable Modal -->
    <Modal
      :isVisible="showModal"
      title="Edit Budget"
      @close="showModal = false"
    >
      <form
        @submit.prevent="editBudget"
        class=" bg-white"
      >
        <div class="w-full mx-auto space-y-4 flex flex-col justify-center">
          <input
            v-model="data.title"
            type="text"
            placeholder="title"
            class="w-full p-2 border rounded"
            required
          />
          <input
            v-model="data.total_amount"
            type="number"
            placeholder="total_amount"
            class="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            v-model="data.duration"
            type="number"
            placeholder="duration"
            class="w-full mb-4 p-2 border rounded"
            required
          />
          <div class="flex justify-between gap-3">
            <button
              type="submit"
              class="w-auto bg-main text-white px-4 py-2 rounded"
            >
              Edit Budget
            </button>
            <button
              @click="showModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
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

defineProps({
//   buttonLabel: { type: String, required: true }, // Trigger button label
  userData: { 
    type: Object, 
    required: false, // Set as optional to handle undefined cases gracefully
    // default: () => ({ title: '', total_amount: '', duration: '' }) 
  },
});

const showModal = ref(false);
const data = ref({
    title : '',
    duration: '',
    total_amount: ''
})

const editBudget = () =>  {
console.log(data.value);

}

</script>
