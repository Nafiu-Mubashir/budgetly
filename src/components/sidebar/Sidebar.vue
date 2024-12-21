<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden md:block w-60 bg-secondary/20 text-black p-4 h-screen border-r"
  >
  <div class="flex flex-col justify-between h-full">
    <!-- Sidebar Header -->
    <div class="space-y-10">
        <div class="border-b p-1.5">
          <img
          src="../../assets/logo.png"
          class="block"
          alt="hg"
        />
        </div>
        
        <!-- Navigation Links -->
        <ul class="space-y-4 mt-4">
          <li
            v-for="navLink in navLinks"
            :key="navLink.name"
            :class="{
              'bg-main text-white rounded-md': isActive(navLink.path),
            }"
          >
            <router-link
              :to="navLink.path"
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
        <h3 class="p-2 text-red-500 hover:text-red-600">Logout</h3>
      </div>
    </div>
  </aside>
</template>

<script setup>
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
</script>
