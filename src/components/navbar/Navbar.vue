<template>
  <div class="border-b p-2">
    <nav
      class="bg-white text-black flex justify-between items-center w-[95%] mx-auto"
    >
      <div class="flex items-center w-auto md:w-[40%]">
        <!-- Mobile Sidebar Toggle -->
        <MobileSidebar />
        <!-- Dynamic Page Title -->
        <input
          type="text"
          placeholder="Search hear for sending..."
          class="w-full py-1 px-2 border rounded hidden md:block border-main focus:outline-none placeholder:text-sm"
          required
        />
      </div>

      <div class="flex items-center gap-2">
        <img
          src="../../assets/profile.png"
          class="h-6 md:h-10 w-6 md:w-10"
          alt="user"
        />
        <div>
          <h2 class="text-xs">Mubashir N.</h2>
          <p class="text-xs">Online</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import MobileSidebar from "../sidebar/MobileSidebar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

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
