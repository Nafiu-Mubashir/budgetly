<template>
  <div>
    <!-- Sidebar Toggle Button -->
    <button
      @click="toggleMobileSidebar"
      class="bg-main text-white p-2 rounded md:hidden"
    >
      ☰
    </button>

    <!-- Mobile Sidebar -->
    <transition name="sidebar">
      <aside
        v-if="isMobileSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 flex md:hidden"
      >
        <div
          class="w-64 bg-white text-black h-full p-4 transform ease-in-out duration-300"
        >
          <div class="flex justify-between">
             <h1 class="uppercase font-bold text-xl text-main">Budgetly</h1>
            <button @click="toggleMobileSidebar" class="text-white mb-4 block ml-auto text-sm">
            ✖
          </button>
          </div>
          <ul class="space-y-4 mt-4">
            <li v-for="navLink in navLinks">
              <router-link
                @click="toggleMobileSidebar"
                :to="navLink.path"
                class="block p-2 hover:bg-gray-700 rounded-md"
                >{{ navLink.name }}</router-link
              >
            </li>
          </ul>
        </div>
        <!-- Click outside to close the sidebar -->
        <div class="flex-1" @click="toggleMobileSidebar"></div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
const navLinks = [
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/dashboard/budget",
    name: "Budget",
  },
  {
    path: "/dashboard/transaction",
    name: "Transaction",
  },
  {
    path: "/dashboard/insight",
    name: "Insight",
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
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
