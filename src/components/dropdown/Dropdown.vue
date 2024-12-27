<template>
  <div ref="dropdown" class="relative inline-block text-left">
    <!-- Dropdown Trigger -->
    <EllipsisVertical @click="toggleDropdown" />

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      class="absolute top-2 right-2 mt-2 w-32 bg-white rounded shadow-lg z-50 transform translate-y-2"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { EllipsisVertical } from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);

// Reference to the dropdown container
const dropdown = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Optional: Add a fade-in effect for the dropdown menu */
</style>
