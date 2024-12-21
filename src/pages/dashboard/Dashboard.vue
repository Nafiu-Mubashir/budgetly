<template>
  <div class="min-h-screen w-full md:w-[95%] mx-auto space-y-3">
    <!-- Welcome Section -->
    <section class="">
      <h1 class="text-lg font-semibold">Dashboard</h1>
    </section>

    <!-- Financial Summary Section -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
      <div class="bg-white p-4 rounded-lg space-y-5 border">
        <h2
          class="text-base font-semibold lg:font-semibold"
        >
          Total Income
        </h2>
        <p class="text-lg md:text-md font-semibold text-main">
          #{{ summary.income }}
        </p>
      </div>
      <div class="bg-white p-4 rounded-lg space-y-5 border">
        <h2
          class="text-base font-semibold lg:font-semibold"
        >
          Total Expenses
        </h2>
        <p class="text-lg md:text-xl font-semibold text-red-600">
          #{{ summary.expenses }}
        </p>
      </div>
      <div class="bg-white p-4 rounded-lg space-y-5 border">
        <h2
          class="text-base font-semibold lg:font-semibold"
        >
          Remaining Budget
        </h2>
        <p class="text-lg md:text-xl font-semibold text-blue-600">
          #{{ summary.remaining }}
        </p>
      </div>
    </section>

    <section class="bg-white p- rounded-lg shadow-d mt-6">
      <!-- Budgets Overview Header -->
      <h2 class="text-lg md:text-lg font-semibold mb-4">
        Budgets Overview
      </h2>

      <!-- Budgets in Grid Format -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Each Budget Overview -->
        <div
          v-for="budget in budgets"
          :key="budget.id"
          class="p-2 md:p-4 bg-gray-50 rounded-lg shadow-sm"
        >
          <p
            class="text-base font-semibold capitalize"
          >
            {{ budget.name }}
          </p>
          <div class="relative bg-gray-200 h-2 rounded-full mt-2">
            <div
              class="absolute bg-main h-2 rounded-full"
              :style="{ width: budget.progress + '%' }"
            ></div>
          </div>
          <p class="text-sm text-gray-500 mt-2">
            #{{ budget.spent }} of #{{ budget.total }} spent ({{
              budget.progress
            }}%)
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <section class="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
        <!-- Recent Transactions -->
        <h2 class="text-lg md:text-xl font-semibold">
          Recent Transactions
        </h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            class="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <div>
              <p class="font-medium text-gray-800">
                {{ transaction.category }}
              </p>
              <p class="text-sm text-gray-500">{{ transaction.date }}</p>
            </div>
            <p
              :class="
                transaction.type === 'income' ? 'text-main' : 'text-red-600'
              "
              class="font-semibold flex items-center"
            >
              <span>{{ transaction.type === "income" ? "+" : "-" }}#</span>
              <span>{{ transaction.amount }}</span>
            </p>
          </li>
        </ul>
      </section>

      <!-- Spending Insights -->
      <section class="bg-white p-4 w-full rounded-lg shadow-md space-y-2">
        <h2 class="text-lg md:text-xl font-semibold">
          Spending Insights
        </h2>
        <canvas id="spendingChart"></canvas>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Chart from "chart.js/auto";

const store = useStore();

const user = ref({
  name: "Mubashir N.",
});

const summary = ref({
  income: "3,000,000",
  expenses: "1,000,000",
  remaining: "2,000,000",
});

const budgets = ref([
  { id: 1, name: "Food", spent: 200, total: 500, progress: 40 },
  { id: 2, name: "Entertainment", spent: 100, total: 200, progress: 50 },
  { id: 3, name: "subscription", spent: 100, total: 200, progress: 80 },
]);

const recentTransactions = ref([
  {
    id: 1,
    category: "Groceries",
    date: "2024-12-17",
    type: "expense",
    amount: 75,
  },
  { id: 2, category: "Fuel", date: "2024-12-16", type: "expense", amount: 40 },
  {
    id: 3,
    category: "Salary",
    date: "2024-12-15",
    type: "income",
    amount: 3000,
  },
]);

// Chart Initialization
const initChart = () => {
  const ctx = document.getElementById("spendingChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Food", "Rent", "Entertainment"],
      datasets: [
        {
          label: "Spending",
          data: [500, 1200, 150],
          backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
};

onMounted(() => {
  initChart();
});
</script>
