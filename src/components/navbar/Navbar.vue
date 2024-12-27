<template>
  <div class="border-b p-2 shadow-md">
    <nav
      class="bg-[#E9E9E9] text-black flex justify-between items-center w-[95%] mx-auto"
    >
      <div class="flex items-center w-auto md:w-[40%]">
        <!-- Mobile Sidebar Toggle -->
        <MobileSidebar />
        <!-- Dynamic Page Title -->
        <!-- <input
          type="text"
          placeholder="Search..."
          class="w-full py-1 px-4 border rounded-full hidden md:block border-main focus:outline-none placeholder:text-sm"
          required
        /> -->
        <div class="relative w-full hidden md:block">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
             <Search color="#AFB4BD" size="28" class="absolute start-0 flex items-center ps-3 pointer-events-none"/>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-1.5 ps-8 text-sm text-gray-900 border border-main rounded-full bg-[#E9E9E9] focus:ring-main focus:border-main focus:outline-none placeholder:text-sm"
            placeholder="Search..."
            required
          />
        </div>
      </div>
      <div class="flex items-center gap-2">
       <CircleUser strokeWidth={1} size="32" />
        <div>
          <h2 class="text-xs">{{username}}</h2>
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
import { useStore } from "vuex";
import { CircleUser, Search } from "lucide-vue-next";

const route = useRoute();
const store = useStore()
const username = store.getters["auth/user"]

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
