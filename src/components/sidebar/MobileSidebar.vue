<template>
  <div>
    <!-- Sidebar Toggle Button -->
    <button
      @click="toggleMobileSidebar"
      class="bg-blue-600 text-white p-2 rounded md:hidden"
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
          class="w-64 bg-gray-800 text-white h-full p-4 transform ease-in-out duration-300"
        >
          <button @click="toggleMobileSidebar" class="text-white mb-4">✖</button>
        <ul class="space-y-4 mt-4">
          <li>
            <router-link
            @click="toggleMobileSidebar"
              to="/dashboard"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link
            @click="toggleMobileSidebar"
              to="/dashboard/budget"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Budgets</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/transaction"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Transactions</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/insight"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Insights</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/profile"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Profile</router-link
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
