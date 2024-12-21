<template>
  <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="bg-main text-white px-4 py-2 rounded"
    >
      Add Budget
    </button>

    <!-- Reusable Modal -->
    <Modal
      :isVisible="showModal"
      title="Create A New Budget"
      @close="showModal = false"
    >
      <form
        @submit.prevent="createBudget"
        class="flex flex-col justify-center bg-white"
      >
        <div class="w-full mx-auto space-y-4">
          <Input
            v-model="title"
            type="text"
            placeholder="title"
          />
          <Input
            v-model="total_amount"
            type="number"
            placeholder="total_amount"
          />
          <Input
            v-model="duration"
            type="text"
            placeholder="duration"
          />
          <div class="flex justify-between gap-3">
            <button
              type="submit"
              class="w-auto md:w-[40%] bg-main text-white p-2 rounded"
            >
              Create Budget
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
import Input from "../input/Input.vue";

const showModal = ref(false);

const title = ref("");
const total_amount = ref("");
const duration = ref("");

const createBudget = () =>  {
 toast.success("Budget created successfully");
 showModal.value = false
}

</script>
