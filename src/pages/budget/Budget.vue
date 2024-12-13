<template>
  <h1 class="text-2xl font-bold mb-6">Welcome to Your Budget</h1>
  <p>This is the main budget management page.</p>
  <div>
    <!-- Open Modal Button -->
    <button
      @click="showModal = true"
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Create Budget
    </button>

    <!-- Reusable Modal -->
    <Modal
      :isVisible="showModal"
      title="Create A New Budget"
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
            <button
              type="submit"
              class="w-full md:w-[30%] bg-blue-600 text-white p-2 rounded"
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

    <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Reusable Table Example</h1>
    <Table :data="tableData" :columns="columns">
      <template #actions="{ row, id }">
        <button
          @click="editRow(row)"
          class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          @click="deleteRow(id)"
          class="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </template>
    </Table>
  </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Table from "@/components/table/Table.vue";

const tableData = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", age: 22, email: "alice@example.com" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
   { key: "actions", label: "Actions" },
];

const showModal = ref(false);

const title = ref("");
const total_amount = ref("");
const duration = ref("");

const editRow = (id) => {
  console.log(`Editing row with ID: ${id}`);
};

const deleteRow = (id) => {
  console.log(`Deleting row with ID: ${id}`);
};

const login = async () => {
  //   try {
  //     const response = await api.post("/login", { total_amount: total_amount.value, duration: duration.value });
  //     localStorage.setItem("token", response.data.token);
  //   } catch (error) {
  //     alert("Login failed");
  //   }
};
</script>
