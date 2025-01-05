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
    // Call all APIs concurrently
    await Promise.all([
      store.dispatch("dashboard/fetchSummary"),
      store.dispatch("dashboard/fetchMonthlySummary"),
      store.dispatch("transaction/fetchTransactions"),
      store.dispatch("budget/fetchBudgets"),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.mainBg {
 background: url('../assets/main-bg.jpg')
}
</style>
