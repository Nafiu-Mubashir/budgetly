<template>
  <div
    v-show="isVisible"
    class="inset-0 h-screen flex items-center justify-center z-50 top-[-16px] absolute bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-[95%] md:w-full max-w-lg"
    >
      <div class="flex justify-between items-center p-3 border-b">
        <!-- Modal Header -->
        <header v-if="title">
          <h2 class="text-base">{{ title }}</h2>
        </header>
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="block ml-auto"
        >
          <X size="20" />
        </button>
      </div>
      <!-- Modal Body -->
      <div class="p-4">
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
import { defineProps, defineEmits, } from "vue";
import { X } from 'lucide-vue-next';

// Props passed into the modal
const props = defineProps({
  isVisible: { type: Boolean, required: true }, // Visibility state of the modal
  title: { type: String, default: "" }, // Optional title
});

const emit = defineEmits(["close"]);

// Close the modal by emitting the close event
const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Optional animations for the modal */
[v-cloak] {
  display: none;
}
</style>
