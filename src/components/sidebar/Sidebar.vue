<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden md:block w-60 bg-[#F5F5F5] text-black p-4 h-screen border-r"
  >
    <div class="flex flex-col justify-between h-full">
      <!-- Sidebar Header -->
      <div class="space-y-10">
        <div class="">
          <img src="../../assets/logo.png" class="block" alt="hg" />
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

      <div class="flex items-center cursor-pointer" @click="showModal = true">
        <img src="../../assets/logout.png" class="h-5 w-5" alt="" />
        <h3 class="p-2 text-red-500 hover:text-red-600">Logout</h3>
      </div>
    </div>
  </aside>

  <Modal
    :isVisible="showModal"
    title=""
    @close="showModal = false"
  >
    <div class="space-y-6">
      <div class="space-y-3">
        <svg
        width="50"
        height="50"
        class="p-2 rounded-full bg-red-600/20 block mx-auto"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.3919 20.2008C37.3919 29.4075 29.9303 36.8675 20.7253 36.8675C11.5203 36.8675 4.05859 29.4075 4.05859 20.2008C4.05859 10.9975 11.5203 3.53418 20.7253 3.53418C29.9303 3.53418 37.3919 10.9975 37.3919 20.2008Z"
          fill="#DC2626"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.1755 21.2527C22.1755 22.0561 21.5205 22.7111 20.7171 22.7111C19.9138 22.7111 19.2588 22.0561 19.2588 21.2527V13.8861C19.2588 13.0827 19.9138 12.4277 20.7171 12.4277C21.5205 12.4277 22.1755 13.0827 22.1755 13.8861V21.2527ZM19.268 26.5407C19.268 25.7374 19.9197 25.0824 20.718 25.0824C21.5397 25.0824 22.193 25.7374 22.193 26.5407C22.193 27.3441 21.5397 27.9991 20.7347 27.9991C19.9263 27.9991 19.268 27.3441 19.268 26.5407Z"
          fill="white"
        />
      </svg>
      <p class="text-center">Are you sure you want to logout?</p>
      </div>

      <div class="flex justify-between gap-3">
        <button
          type="submit"
          class="bg-red-600 text-white px-4 p-2 rounded"
          @click="logout"
        >
          Yes
        </button>
        <button
          @click="showModal = false"
          class="bg-gray-500 text-white px-4 py-2 rounded"
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
import dashboard from "@/assets/dashboard.png";
import budget from "@/assets/budget.png";
import transaction from "@/assets/transaction.png";
import insight from "@/assets/insight.png";
import profile from "@/assets/profile.png";
import Modal from "../modal/Modal.vue";
import { ref } from "vue";

const showModal = ref(false);
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
  // {
  //   path: "/dashboard/insight",
  //   name: "Insight",
  //   icon: insight, // Insight Icon
  // },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: profile, // Profile Icon
  },
];
</script>
