<template>
  <div class="space-y-6">
    <div>
      <h2 class="font-bold text-base">{{ username }}</h2>
      <p class="text-secondary text-sm">Hello, welcome back 👋</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <!-- Overview Cards -->
        <div
        v-if="!summary"
      v-for="index in 4"
      :key="index"
      class="bg-gray-200 animate-pulse rounded-lg shadow p-4 h-24"
    ></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DashCard title="Total Budget" :value="summary.Total_Budget" />
        <DashCard title="Balance" :value="summary.Net_Balance" />
        <DashCard title="Total Income" :value="summary.Total_Income" />
        <DashCard title="Total Expenses" :value="summary.Total_Expenses" />
      </div>

      <!-- Financial Statistics -->
      <div class="bg-white rounded-lg shadow p-3">
        <h2 class="text-lg font-bold mb-4">Financial Statistics</h2>
        <ApexChart
          type="bar"
          height="250"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>
    </div>

    <div class="bg-white rounded-lg shadow space-y-3 p-4">
      <h2 class="text-lg font-bold">Top Spending Categories</h2>
      <!-- Top Spending Categories -->
       <div v-if="summary?.Top_Spending_Categories?.length === 0">
          No transactions available
        </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" v-else>
        <DashBudgetCard
          v-for="category in summary.Top_Spending_Categories"
          :title="category.Category"
          :amount="category.Total_Spent"
          :key="category"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-bold mb-4">Recent Transactions</h2>
        <div v-if="summary?.Last_Transactions?.length === 0">
          No transactions available
        </div>
        <ul class="space-y-4" v-else>
          <li
            v-for="(transaction, index) in summary?.Last_Transactions"
            :key="index"
            class="flex justify-between"
          >
            <div class="flex items-center space-x-4">
              <div>
                <p class="font-bold">{{ transaction.Narration }}</p>
                <p class="text-sm text-gray-500">
                  {{ shortDateFormatter(transaction.Date_Created) }},
                  {{ timeFormatter(transaction.Date_Created) }}
                </p>
              </div>
            </div>
            <p
              :class="[
                'text-sm font-bold',
                transaction.Transaction_Type === 'income'
                  ? 'text-green-500'
                  : 'text-red-500',
              ]"
            >
              {{ transaction.Transaction_Type === "income" ? "+" : "-" }}${{
                commaFormatter(transaction.Amount)
              }}
            </p>
          </li>
        </ul>
      </div>

      <div class="space-y-3 md:col-span-2">
        <!-- latest budgets Table -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-bold mb-4">Recent Budgets</h2>
          <Table :data="summary.Last_Budgets" :columns="columns" paginate="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ApexChart from "vue3-apexcharts";
import DashCard from "@/components/cards/DashCard.vue";
import DashBudgetCard from "@/components/cards/DashBudgetCard.vue";
import Table from "@/components/table/Table.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import {
  commaFormatter,
  shortDateFormatter,
  timeFormatter,
} from "@/utils/formatter";

const store = useStore();
const username = store.getters["auth/user"];
const summary = computed(() => store.getters["dashboard/summary"]);
console.log(summary.value.Monthly_Breakdown);

// Transform `monthly summary` data for the chart
const categories = computed(
  () => summary?.value?.Monthly_Breakdown?.map((item) => item.Month) // Extract months for x-axis
);
const incomeSeries = computed(
  () => summary?.value?.Monthly_Breakdown?.map((item) => parseFloat(item.Total_Income)) // Total income data
);
const expenseSeries = computed(
  () => summary?.value?.Monthly_Breakdown?.map((item) => parseFloat(item.Total_Expenses)) // Total expenses data
);


// Chart options and series
const chartOptions = computed(() => ({
  chart: { id: "financial-statistics", toolbar: { show: false } },
  xaxis: { categories: categories.value }, // Use transformed categories
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      columnWidth: "55%",
      borderRadiusApplication: "end",
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    y: {
      formatter: (value) => `$${value.toLocaleString()}`,
    },
  },
}));

const chartSeries = computed(() => [
  { name: "Income", data: incomeSeries.value }, // Income series
  { name: "Expenses", data: expenseSeries.value }, // Expenses series
]);

// Define columns for the table
const columns = [
  { key: "Title", label: "Title" },
  { key: "Total_Amount", label: "Total Amount ($)" },
  { key: "Duration", label: "Duration" },
];

</script>
