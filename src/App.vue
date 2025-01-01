<template>
  <div id="app" class="min-h-screen bg-white">
    <!-- Dynamic Component Rendering Based on Route -->
    <router-view />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

onMounted(async () => {
  try {
    await store.dispatch("dashboard/fetchSummary");
    await store.dispatch("dashboard/fetchMonthlySummary");
  } catch (error) {
    console.error("Error fetching summary or monthly data:", error);
  }
  
  try {
    await store.dispatch("transaction/fetchTransactions");
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }

  try {
    await store.dispatch("budget/fetchBudgets");
  } catch (error) {
    console.error("Error fetching budgets:", error);
  }

});
</script>
<style scoped></style>
