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
      title="Edit Transaction"
      @close="showModal = false"
    >
      <form
        @submit.prevent="editTransaction"
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
              Update
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

// Define props
const props = defineProps({
  userData: { 
    type: Object, 
    required: false,
    // default: () => ({ title: '', total_amount: '', duration: '' }) 
  },
});

const showModal = ref(false);

// Clone userData to a reactive variable
const data = ref({ ...props.userData.row });
console.log(data);


const editTransaction = () => {
  console.log("Updated Data:", data.value);
};
</script>

