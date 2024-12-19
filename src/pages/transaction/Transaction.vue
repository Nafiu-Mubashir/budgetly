<template>
  <div class="md:w-[95%] mx-auto min-h-screen space-y-3">
    <section class="">
      <h1 class="text-lg font-bold">
       Transaction
      </h1>
    </section>
    <div class="flex justify-end">
      <CreateTransaction />
    </div>

    <div class="mt-5">
      <Table :data="tableData" :columns="columns">
        <template #actions="{ row, id }">
          <Dropdown>
            <ul class="py-1">
              <li>
                <EditTransaction :userData="{ row }" />
              </li>
              <li>
                <button
                  @click="change"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <ViewTransaction :userData="{ row }" />
                </button>
              </li>
              <li>
                <DeleteTransaction :id="id" :name="row.title" />
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
import CreateTransaction from "@/components/transactionComponents/CreateTransaction.vue";
import EditTransaction from "@/components/transactionComponents/EditTransaction.vue";
import ViewTransaction from "@/components/transactionComponents/ViewTransaction.vue";
import DeleteTransaction from "@/components/transactionComponents/DeleteTransaction.vue";
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";

const tableData = [
  { id: 1, category: "Debit", total_amount: "30,000", narration: "Food Items" },
  { id: 2, category: "Debit", total_amount: "20,000", narration: "Fuel" },
  { id: 3, category: "Debit", total_amount: "35,000", narration: "House Rent" },
  {
    id: 4,
    category: "Debit",
    total_amount: "100,000",
    narration: "Subscription Fee",
  },
  {
    id: 5,
    category: "Debit",
    total_amount: "15,000",
    narration: "Gym Payment",
  },
  { id: 6, category: "Credit", total_amount: "1,000,000", narration: "Salary" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "narration", label: "narration" },
  { key: "total_amount", label: "Total Amount" },
  { key: "category", label: "category" },
  { key: "actions", label: "Actions" },
];
</script>
