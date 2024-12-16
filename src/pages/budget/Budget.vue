<template>
  <h1 class="text-2xl font-bold mb-6">Welcome to Your Budget</h1>
  <p>This is the main budget management page.</p>
  <div>
    <div class="flex justify-end">
      <CreateBudget />
    </div>
    <Modal
      :isVisible="editModal"
      title="Create A New Budget"
      @close="editModal = false"
    >
      Edit user {{ userId }}
    </Modal>
    <div class="mt-5">
      <Table :data="tableData" :columns="columns">
        <template #actions="{ row, id }">
          <Dropdown>
            <ul class="py-1">
              <li>
                <EditBudget :userData={row} />
              </li>
              <li>
                <button
                  @click="change"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <ViewBudget :userData={row} />
                </button>
              </li>
              <li>
                <DeleteBudget :id="id" :name="row.name" />
              </li>
            </ul>
          </Dropdown>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import CreateBudget from "@/components/budgetComponents/CreateBudget.vue";
import EditBudget from "@/components/budgetComponents/EditBudget.vue";
import DeleteBudget from "@/components/budgetComponents/DeleteBudget.vue";
import ViewBudget from "@/components/budgetComponents/ViewBudget.vue";

const tableData = [
  { id: 1, title: "John Doe", total_amount: 28, duration: "john@example.com" },
  { id: 2, title: "Jane Smith", total_amount: 34, duration: "jane@example.com" },
  { id: 3, title: "Alice Johnson", total_amount: 22, duration: "alice@example.com" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Total Amount" },
  { key: "duration", label: "Duration" },
  { key: "actions", label: "Actions" },
];

const editModal = ref(false);

const edit = ref("edit");
const userId = ref();

</script>
