<template>
  <div
    v-show="isVisible"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-[95%] md:w-full max-w-md p-6 space-y-4"
    >
    <div class="flex justify-between items-center">
      <!-- Modal Header -->
    <header v-if="title" class="mb-">
      <h2 class="text-base font-bold">{{ title }}</h2>
    </header>
      <!-- Close Button -->
      <button
        @click="closeModal"
        class=" text-gray-500 hover:text-black"
      >
        ✖
      </button>
    </div>
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
