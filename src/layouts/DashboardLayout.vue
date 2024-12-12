<template>
  <div class="h-screen flex">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="flex-grow overflow-y-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/sidebar/Sidebar.vue";
import Navbar from "../components/navbar/Navbar.vue";
</script>
