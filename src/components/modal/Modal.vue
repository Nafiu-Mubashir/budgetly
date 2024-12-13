<template>
  <div
    v-show="isVisible"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-[95%] md:w-full max-w-lg p-6 relative"
    >
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-5 right-3 text-gray-500 hover:text-black"
      >
        ✖
      </button>
      <!-- Modal Header -->
      <header v-if="title" class="mb-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>
      </header>
      <!-- Modal Body -->
      <div>
        <slot></slot>
      </div>
      <!-- Modal Footer -->
      <footer v-if="$slots.footer" class="mt-4">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  isVisible: { type: Boolean, required: true }, // Visibility state of the modal
  title: { type: String, default: "" }, // Optional title
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Optional animations for the modal */
[ v-cloak ] {
  display: none;
}
</style>
