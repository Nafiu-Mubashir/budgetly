<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DashCard title="Total Budget" :value="summary.Remaining_Budget" />
        <DashCard title="Balance" value="" />
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashBudgetCard
          v-for="category in summary.Top_Spending_Categories"
          :title="category.category"
          :amount="category.total_amount_spent"
          :key="category"
        />
        <!-- <DashBudgetCard title="Transportation" amount="$36.2" />
        <DashBudgetCard title="Education" amount="$3,450" />
        <DashBudgetCard title="Holiday" amount="$29.0" /> -->
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-bold mb-4">Recent Transactions</h2>
        <div v-if="latestTransactions.length === 0">
          No transactions available
        </div>
        <ul class="space-y-4" v-else>
          <li
            v-for="(transaction, index) in latestTransactions"
            :key="index"
            class="flex justify-between"
          >
            <div class="flex items-center space-x-4">
              <div>
                <p class="font-bold">{{ transaction.narration }}</p>
                <p class="text-sm text-gray-500">
                  {{ shortDateFormatter(transaction.created_at) }},
                  {{ timeFormatter(transaction.created_at) }}
                </p>
              </div>
            </div>
            <p
              :class="[
                'text-sm font-bold',
                transaction.transaction_type === 'income'
                  ? 'text-green-500'
                  : 'text-red-500',
              ]"
            >
              {{ transaction.transaction_type === "income" ? "+" : "-" }}${{
                commaFormatter(transaction.amount)
              }}
            </p>
          </li>
        </ul>
      </div>

      <div class="space-y-3 md:col-span-2">
        <!-- latest budgets Table -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-bold mb-4">Recent Budgets</h2>
          <Table :data="latestBudget" :columns="columns" />
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
const summary = computed(() => store.getters["dashboard/summary"]);
const monthlySummary = computed(
  () => store.getters["dashboard/monthlySummary"]
);
const latestTransactions = computed(() => {
  // Get the transactions from the store
  const allTransactions = store.getters["transaction/transactions"];
  return allTransactions.slice(0, 3); // Take the first 3 transactions
});

const latestBudget = computed(() => {
  // Get the budgets from the store
  const allBudgets = store.getters["budget/budgets"];
  return allBudgets.slice(0, 3); // Take the first 3 budgets
});

// Transform `monthlySummary` data for the chart
const categories = computed(
  () => monthlySummary.value.map((item) => item.month) // Extract months for x-axis
);
const incomeSeries = computed(
  () => monthlySummary.value.map((item) => parseFloat(item.total_income)) // Total income data
);
const expenseSeries = computed(
  () => monthlySummary.value.map((item) => parseFloat(item.total_expenses)) // Total expenses data
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
  // { key: "id", label: "S/N" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Total Amount ($)" },
  { key: "duration", label: "Duration" },
];
// const recentTransactions = [
//   { name: "Phone Store", date: "6 May 2024, 10 AM", amount: -899 },
//   { name: "Shoe Store", date: "7 May 2024, 8 PM", amount: -1550 },
//   { name: "Air Ticket", date: "8 May 2024, 7 AM", amount: -800 },
//   { name: "Fund Payment", date: "10 May 2024, 3 PM", amount: 2120 },
//   { name: "Top Up", date: "11 May 2024, 1 PM", amount: 1920 },
// ];

// const payouts = [
//   {
//     name: "Electricity",
//     status: "Paid",
//     charges: "$5,985.56",
//     total: "$4,920.00",
//   },
//   {
//     name: "Water Costs",
//     status: "Pending",
//     charges: "$4,876.00",
//     total: "$4,498.00",
//   },
//   { name: "Pay Tax", status: "Paid", charges: "$1,985.56", total: "$1,978.00" },
// ];

// const tableColumns = [
//   { key: "name", label: "Name" },
//   { key: "status", label: "Status" },
//   { key: "charges", label: "Charges" },
//   { key: "total", label: "Total" },
// ];
</script>
