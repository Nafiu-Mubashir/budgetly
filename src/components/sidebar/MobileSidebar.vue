<template>
  <div class="">
    <!-- Sidebar Toggle Button -->
    <button
      @click="toggleMobileSidebar"
      class="bg-white text-main p-2 text-xl rounded md:hidden"
    >
      ☰
    </button>

    <!-- Mobile Sidebar -->
    <transition name="sidebar">
      <aside
        v-if="isMobileSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 flex md:hidden h-screen"
      >
        <div
          class="w-64 bg-white text-black h-full p-4 transform ease-in-out duration-300"
        >
          <div class="flex items-center justify-between mb-4">
            <img
          src="../../assets/logo.png"
          class="block h-8 w-10"
          alt="hg"
        />
            <button
              @click="toggleMobileSidebar"
              class="text-white block ml-auto text-sm"
            >
              ✖
            </button>
          </div>
         <div class="flex flex-col justify-between h-full">
      <!-- Sidebar Header -->
      <div class="space-y-">
        <!-- Navigation Links -->
        <ul class="space-y-2 mt-4">
          <li
            v-for="navLink in navLinks"
            :key="navLink.name"
            :class="{
              'bg-main text-white rounded-md': isActive(navLink.path),
            }"
          >
            <router-link
              :to="navLink.path"
              @click="toggleMobileSidebar"
              class="flex items-center space-x-2 p-2 rounded-md transition hover:bg-main hover:text-white"
            >
              <!-- Icon -->
              <img :src="navLink.icon" class="h-5 w-5" alt="icon" />
              <!-- Link Name -->
              <span>{{ navLink.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Logout -->

      <div class="flex items-center cursor-pointer" @click="logout">
        <img src="../../assets/logout.png" class="h-5 w-5" alt="" />
        <h1 class="p-2 text-red-500 hover:text-red-600">Logout</h1>
      </div>
    </div>
        </div>
        
        <!-- Click outside to close the sidebar -->
        <div class="flex-1" @click="toggleMobileSidebar"></div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLogout } from "@/utils/logout.js";
import { useRoute } from "vue-router";
import dashboard from "@/assets/dashboard.png";
import budget from "@/assets/budget.png";
import transaction from "@/assets/transaction.png";
import insight from "@/assets/insight.png";
import profile from "@/assets/profile.png";

// Logout utility
const logout = useLogout();

// Current route for active state
const route = useRoute();

// Determine active link
const isActive = (path) => route.path === path;

// Navigation links with icons
const navLinks = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: dashboard, // Dashboard Icon
  },
  {
    path: "/dashboard/budget",
    name: "Budget",
    icon: budget, // Budget Icon
  },
  {
    path: "/dashboard/transaction",
    name: "Transaction",
    icon: transaction, // Transaction Icon
  },
  {
    path: "/dashboard/insight",
    name: "Insight",
    icon: insight, // Insight Icon
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: profile, // Profile Icon
  },
];
const isMobileSidebarOpen = ref(false);

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};
</script>

<style scoped>
/* Sidebar Animation */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.sidebar-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
