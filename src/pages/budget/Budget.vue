<template>
  <div class="md:w-[95%] mx-auto min-h-screen space-y-3">
    <section class="">
      <h1 class="text-lg font-bold">
       Budget
      </h1>
    </section>
    <div class="flex justify-end">
      <CreateBudget />
    </div>
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
                <DeleteBudget :id="id" :name="row.title" />
              </li>
            </ul>
          </Dropdown>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/table/Table.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import CreateBudget from "@/components/budgetComponents/CreateBudget.vue";
import EditBudget from "@/components/budgetComponents/EditBudget.vue";
import DeleteBudget from "@/components/budgetComponents/DeleteBudget.vue";
import ViewBudget from "@/components/budgetComponents/ViewBudget.vue";

const tableData = [
  { id: 1, title: "Food", total_amount: "30,000", duration: "monthly" },
  { id: 2, title: "Fuel", total_amount: "20,000", duration: "weekly" },
  { id: 3, title: "House Rent", total_amount: "35,000", duration: "yearly" },
  { id: 3, title: "Router Subscription", total_amount: "100,000", duration: "yearly" },
  { id: 3, title: "Gym", total_amount: "15,000", duration: "monthly" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Total Amount" },
  { key: "duration", label: "Duration" },
  { key: "actions", label: "Actions" },
];

</script>
