<template>
  <!-- Mobile Menu Button -->
  <button
    @click="isMobileSidebarOpen = !isMobileSidebarOpen"
    class="md:hidden fixed top-1.5 left-3 z-50 p-2 rounded-lg"
  >
    <Menu v-if="!isMobileSidebarOpen" class="w-6 h-6" />
  </button>
  <!-- Desktop Sidebar -->
  <aside
    class="w-60 bg-white text-black p-4 h-screen border-r"
    :class="[
      'fixed md:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0',
      isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex flex-col justify-between h-full">
      <!-- Sidebar Header -->
      <div class="space-y-10">
        <div class="flex justify-between items-center">
          <img src="../../assets/logo.png" class="block" alt="hg" />
          <X
            @click="isMobileSidebarOpen = !isMobileSidebarOpen"
            class="w-6 h-6 block md:hidden"
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
              @click="isMobileSidebarOpen = !isMobileSidebarOpen"
              class="flex items-center space-x-2 p-2 rounded-md transition hover:bg-main/60 hover:text-white"
            >
              <!-- Icon -->
              <component :is="navLink.icon" class="w-5 h-5" />
              <!-- Link Name -->
              <span>{{ navLink.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Logout -->

      <div
        class="flex items-center cursor-pointer space-x-2 hover:bg-[#F11111] group p-2 rounded-md"
        @click="showModal = true"
      >
        <LogOut color="#F11111" size="20" class="group-hover:stroke-white" />
        <h3 class="text-[#F11111] group-hover:text-white">Logout</h3>
      </div>
    </div>
  </aside>
  <Modal :isVisible="showModal" title="" @close="showModal = false">
    <div class="space-y-6">
      <div class="space-y-3">
        <CircleAlert
          color="white"
          size="50"
          class="p-2 fill-[#DC2626] rounded-full bg-[#DC2626]/20 block mx-auto"
        />
        <p class="text-center text-sm md:text-base">Are you sure you want to logout?</p>
      </div>

      <div class="flex justify-between gap-3">
        <button
          type="submit"
          class="bg-red-600 text-white px-4 p-2 rounded w-1/2"
          @click="logout"
        >
          Yes
        </button>
        <button
          @click="showModal = false"
          class="bg-gray-500 text-white px-4 py-2 rounded w-1/2"
        >
          No
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { useLogout } from "@/utils/logout.js";
import { useRoute } from "vue-router";
import Modal from "../modal/Modal.vue";
import { ref } from "vue";
import {
  LayoutDashboard,
  Wallet,
  CoinsIcon,
  LogOut,
  X,
  Menu,
  CircleAlert,
  CircleUser
} from "lucide-vue-next";

const showModal = ref(false);
const isMobileSidebarOpen = ref(false);
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
    icon: LayoutDashboard, // Dashboard Icon
  },
  {
    path: "/dashboard/budget",
    name: "Budget",
    icon: Wallet,
  },
  {
    path: "/dashboard/transaction",
    name: "Transaction",
    icon: CoinsIcon,
  },
  // {
  //   path: "/dashboard/profile",
  //   name: "Profile",
  //   icon: CircleUser,
  // },
];
</script>
