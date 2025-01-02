<template>
  <div class="h-screen flex">
    <Sidebar />

    <div class="flex-1 flex flex-col w-screen md:w-[85%] bg-[#E9E9E9]">
      <Navbar />
      <main class="flex-grow overflow-y-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/sidebar/Sidebar.vue";
import Navbar from "../components/navbar/Navbar.vue";
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

<style scoped>
.mainBg {
 background: url('../assets/main-bg.jpg')
}
</style>