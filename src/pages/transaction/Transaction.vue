<template>
    <h1 class="text-2xl font-bold mb-6">Welcome to Your transaction management</h1>
    <p>This is the main transaction management page.</p>
    <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="bg-blue-600 text-white px-4 py-2 rounded"
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
      @submit.prevent="login"
      class="flex flex-col justify-center bg-white"
    >
      <div class="w-full mx-auto space-y-4">
        <input
          v-model="title"
          type="text"
          placeholder="title"
          class="w-full p-2 border rounded"
          required
        />
        <input
          v-model="total_amount"
          type="total_amount"
          placeholder="total_amount"
          class="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          v-model="duration"
          type="duration"
          placeholder="duration"
          class="w-full mb-4 p-2 border rounded"
          required
        />
       <div class="flex justify-between gap-3">
         <button type="submit" class="w-full md:w-[30%] bg-blue-600 text-white p-2 rounded">
          Create Transaction
        </button>
         <button
          @click="showModal = false"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
       </div>
      </div>
    </form>
      <!-- <template #footer>
        <button
          @click="showModal = false"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </template> -->
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/modal/Modal.vue";

const showModal = ref(false);

const title = ref("");
const total_amount = ref("");
const duration = ref("");

const login = async () => {
  //   try {
  //     const response = await api.post("/login", { total_amount: total_amount.value, duration: duration.value });
  //     localStorage.setItem("token", response.data.token);
  //   } catch (error) {
  //     alert("Login failed");
  //   }
};
</script>