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
            <svg
              class="w-3 h-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 ps-8 text-sm text-gray-900 border border-main rounded-full bg-[#E9E9E9] focus:ring-main focus:border-main focus:outline-none placeholder:text-sm"
            placeholder="Search..."
            required
          />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <img
          src="../../assets/profile.png"
          class="h-6 md:h-10 w-6 md:w-10"
          alt="user"
        />
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
