<template>
  <nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <!-- Mobile Sidebar Toggle -->
      <MobileSidebar />
      <h1 class="text-xl font-bold">Dashboard</h1>
    </div>
    <button @click="logout" class="hover:underline">Logout</button>
  </nav>
</template>

<script setup>
import MobileSidebar from "../sidebar/MobileSidebar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
