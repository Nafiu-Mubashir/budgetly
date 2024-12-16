<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden md:block w-60 bg-white text-black p-4 h-screen shadow-md">
    <div class="flex flex-col justify-between h-full">
      <!-- Sidebar Header -->
      <div class="space-y-10">
        <h1 class="uppercase font-bold text-2xl text-main">Budgetly</h1>

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
              <!-- <span class="w-6 h-6 text-gray-500" v-html="navLink.icon.render()"></span> -->
              <!-- Link Name -->
              <span>{{ navLink.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Logout -->
      <h1 class="p-2 cursor-pointer text-red-500 hover:text-red-600" @click="logout">
        Logout
      </h1>
    </div>
  </aside>
</template>

<script setup>
import { useLogout } from "@/utils/logout.js";
import { useRoute } from "vue-router";
import { LibraryIcon, ChartBarIcon, DatabaseIcon, UserIcon, BriefcaseIcon, } from "@vue-hero-icons/outline";

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
    icon: LibraryIcon, // Dashboard Icon
  },
  {
    path: "/dashboard/budget",
    name: "Budget",
    icon: DatabaseIcon, // Budget Icon
  },
  {
    path: "/dashboard/transaction",
    name: "Transaction",
    icon: ChartBarIcon, // Transaction Icon
  },
  {
    path: "/dashboard/insight",
    name: "Insight",
    icon: BriefcaseIcon, // Insight Icon
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: UserIcon, // Profile Icon
  },
];
</script>


