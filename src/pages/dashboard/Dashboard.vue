<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DashCard
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :value="card.value"
          :growth="card.growth"
          :growthType="card.growthType"
        />
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-bold mb-4">Recent Transactions</h2>
        <ul class="space-y-4">
          <li
            v-for="(transaction, index) in recentTransactions"
            :key="index"
            class="flex justify-between"
          >
            <div class="flex items-center space-x-4">
              <!-- <img
                :src="transaction.icon"
                alt="icon"
                class="w-10 h-10 rounded-full p-1 bg-main/20"
              /> -->
              <div>
                <p class="font-bold">{{ transaction.name }}</p>
                <p class="text-sm text-gray-500">{{ transaction.date }}</p>
              </div>
            </div>
            <p
              :class="[
                'text-sm font-bold',
                transaction.amount > 0 ? 'text-green-500' : 'text-red-500',
              ]"
            >
              {{ transaction.amount > 0 ? "+" : "" }}{{ transaction.amount }}
            </p>
          </li>
        </ul>
      </div>

      <div class="space-y-3 col-span-2">
        <div class="bg-white rounded-lg shadow space-y-3 p-4">
          <h2 class="text-lg font-bold">Monthly Budget</h2>
          <!-- Monthly Budget -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashBudgetCard title="Residential Costs" amount="$1,200" />
            <DashBudgetCard title="Transportation" amount="$36.2" />
            <DashBudgetCard title="Education" amount="$3,450" />
            <DashBudgetCard title="Holiday" amount="$29.0" />
          </div>
        </div>

        <!-- All Payouts Table -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-bold mb-4">All Payouts</h2>
          <Table :data="payouts" :columns="tableColumns" />
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

const store = useStore();
const transactions = computed(() => store.getters["transaction/transactions"]);

const chartOptions = {
  chart: { id: "financial-statistics", toolbar: { show: false } },
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      columnWidth: "55%",
      borderRadiusApplication: "end",
    },
  },
};

const chartSeries = [
  { name: "Budget", data: [10, 15, 12, 8, 11] },
  { name: "Expenditure", data: [8, 7, 11, 9, 10] },
];

const recentTransactions = [
  {
    name: "Phone Store",
    date: "6 May 2024, 10 AM",
    amount: -899,
    // icon: User,
  },
  {
    name: "Shoe Store",
    date: "7 May 2024, 8 PM",
    amount: -1550,
    // icon: User,
  },
  {
    name: "Air Ticket",
    date: "8 May 2024, 7 AM",
    amount: -800,
    // icon: User,
  },
  {
    name: "Fund Payment",
    date: "10 May 2024, 3 PM",
    amount: 2120,
    // icon: User,
  },
  {
    name: "Top Up",
    date: "11 May 2024, 1 PM",
    amount: 1920,
    // icon: User,
  },
];

const payouts = [
  {
    name: "Electricity",
    status: "Paid",
    charges: "$5,985.56",
    total: "$4,920.00",
  },
  {
    name: "Water Costs",
    status: "Pending",
    charges: "$4,876.00",
    total: "$4,498.00",
  },
  {
    name: "Pay Tax",
    status: "Paid",
    charges: "$1,985.56",
    total: "$1,978.00",
  },
];

const tableColumns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "charges", label: "Charges" },
  { key: "total", label: "Total" },
];

const cards = [
  {
    title: "Assets",
    value: "$58,463",
    growth: "+23%",
    growthType: "positive",
  },
  {
    title: "Balance",
    value: "$25,780",
    growth: "+37%",
    growthType: "positive",
  },
  {
    title: "Income",
    value: "$13,583",
    growth: "+45%",
    growthType: "positive",
  },
  {
    title: "Expenditure",
    value: "$8,921",
    growth: "-27%",
    growthType: "negative",
  },
];
</script>
