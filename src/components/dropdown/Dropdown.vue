<template>
  <div ref="dropdown" class="relative inline-block text-left">
    <!-- Dropdown Trigger -->
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="toggleDropdown"
      class="cursor-pointer"
      ariaCurrent="true"
    >
      <circle cx="8.00016" cy="2.49967" r="1.66667" fill="#848484" />
      <circle cx="8.00016" cy="8.49967" r="1.66667" fill="#848484" />
      <circle cx="8.00016" cy="14.4997" r="1.66667" fill="#848484" />
    </svg>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      class="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-[1000] transform translate-y-2"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
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
