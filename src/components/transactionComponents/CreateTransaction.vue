<template>
  <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="bg-main text-white px-4 py-2 rounded"
    >
      Create Transaction
    </button>

    <!-- Reusable Modal -->
    <Modal
      :isVisible="showModal"
      title="Create A New Transaction"
      @close="showModal = false"
    >
      <form
        @submit.prevent="createTransaction"
        class="flex flex-col justify-center bg-white"
      >
        <div class="w-full mx-auto space-y-4">
          <input
            v-model="category"
            type="text"
            placeholder="category"
            class="w-full p-2 border rounded"
            required
          />
          <input
            v-model="total_amount"
            type="number"
            placeholder="total_amount"
            class="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            v-model="narration"
            type="text"
            placeholder="narration"
            class="w-full mb-4 p-2 border rounded"
            required
          />
          <div class="flex justify-between gap-3">
            <button
              type="submit"
              class="w-auto md:w-[40%] bg-main text-white p-2 rounded"
            >
              Create
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
import { toast } from "vue3-toastify";

const showModal = ref(false);

const category = ref("");
const total_amount = ref("");
const narration = ref("");

const createTransaction = () =>  {
 toast.success("Transaction created successfully");
 showModal.value = false
}

</script>
