<template>
  <nav class="bg-main text-white p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <!-- Mobile Sidebar Toggle -->
      <MobileSidebar />
      <!-- Dynamic Page Title -->
      <h1 class="text-xl font-bold">{{ pageTitle }}</h1>
    </div>
  </nav>
</template>

<script setup>
import MobileSidebar from "../sidebar/MobileSidebar.vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

// Mapping route paths to titles
const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/budget": "Budget",
  "/dashboard/transaction": "Transaction",
  "/dashboard/insight": "Insight",
  "/dashboard/profile": "Profile",
};

// Dynamically compute the page title based on the current route
const pageTitle = computed(() => pageTitles[route.path] || "Dashboard");


</script>
