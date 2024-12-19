<template>
  <div class="min-h-screen md:w-[95%] mx-auto space-y-3">
    <!-- Page Header -->
     <section class="">
      <h1 class="text-lg font-bold">
       Financial Insights
      </h1>
    </section>

    <!-- Filters Section -->
    <section class="flex items-center justify-between">
      <div class="flex flex-col md:flex-row items-center md:gap-2">
        <label for="timeRange" class="text-sm md:text-lg text-gray-700 font-semibold">Time Range:</label>
        <select id="timeRange" v-model="filters.timeRange" class="border rounded px-2 py-1 focus:outline-none">
          <option value="7_days">Last 7 Days</option>
          <option value="1_month">Last Month</option>
          <option value="1_year">Last Year</option>
        </select>
      </div>
      <button @click="exportInsights" class="bg-main text-white text-sm px-2 md:px-4 py-2 rounded">Export Insights</button>
    </section>

    <!-- Financial Overview -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg space-y-5 border">
        <h2 class="text-base md:text-lg font-bold md:font-semibold text-gray-700">Total Income</h2>
        <p class="text-base md:text-xl font-bold text-green-600">$ {{ insights.totalIncome }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg space-y-5 border">
        <h2 class="text-base md:text-lg font-bold md:font-semibold text-gray-700">Total Expenses</h2>
        <p class="text-base md:text-xl font-bold text-red-600">$ {{ insights.totalExpenses }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg space-y-5 border">
        <h2 class="text-base md:text-lg font-bold md:font-semibold text-gray-700">Total Savings</h2>
        <p class="text-base md:text-xl font-bold text-blue-600">$ {{ insights.totalSavings }}</p>
      </div>
    </section>

    <!-- Charts Section -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Category-Based Spending Chart -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-700">Category-Based Spending</h2>
        <canvas id="categoryChart"></canvas>
      </div>

      <!-- Income vs Expenses Trend -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-700">Income vs Expenses</h2>
        <canvas id="trendChart"></canvas>
      </div>
    </section>

    <!-- Top Spending Categories -->
    <section class="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 class="text-xl font-bold text-gray-700">Top Spending Categories</h2>
      <ul class="mt-4 space-y-3">
        <li
          v-for="category in insights.topCategories"
          :key="category.name"
          class="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
        >
          <span class="font-medium text-gray-800">{{ category.name }}</span>
          <span class="font-bold text-red-600">$ {{ category.amount }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const filters = ref({
  timeRange: "7_days",
});

const insights = ref({
  totalIncome: "3,000,000",
  totalExpenses: "1,000,000",
  totalSavings: "2,000,000",
  topCategories: [
    { name: "Food", amount: 500 },
    { name: "Rent", amount: 1200 },
    { name: "Entertainment", amount: 300 },
  ],
});

// Initialize Charts
const initCategoryChart = () => {
  const ctx = document.getElementById("categoryChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Food", "Rent", "Entertainment"],
      datasets: [
        {
          data: [500, 1200, 300],
          backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
        },
      ],
    },
  });
};

const initTrendChart = () => {
  const ctx = document.getElementById("trendChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Income",
          data: [1200, 1500, 1100, 1200],
          borderColor: "#34d399",
          fill: false,
        },
        {
          label: "Expenses",
          data: [800, 1000, 900, 700],
          borderColor: "#f87171",
          fill: false,
        },
      ],
    },
  });
};

// Export Insights
const exportInsights = () => {
  alert("Exporting insights...");
};

onMounted(() => {
  initCategoryChart();
  initTrendChart();
});
</script>
