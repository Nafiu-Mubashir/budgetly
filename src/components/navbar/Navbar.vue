<template>
  <div class="border-b p-2 bg-white">
    <nav class="text-black flex justify-end items-center w-[95%] mx-auto">
      <!-- <div class="flex items-center w-auto md:w-[40%]">
        <div class="relative w-full hidden md:block">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <Search
              color="#AFB4BD"
              size="28"
              class="absolute start-0 flex items-center ps-3 pointer-events-none"
            />
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-1.5 ps-8 text-sm text-gray-900 border border-main rounded-full bg-[#E9E9E9] focus:ring-main focus:border-main focus:outline-none placeholder:text-sm"
            placeholder="Search..."
            required
          />
        </div>
      </div> -->
      <div class="flex items-center gap-2">
        <Bell />
        <Avatar :name="username" size="35" />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import { Bell } from "lucide-vue-next";
import Avatar from "@/components/avatar/Avatar.vue"

const route = useRoute();
const store = useStore();
const username = store.getters["auth/user"];

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
