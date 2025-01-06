<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full p-2 py-2.5 rounded capitalize flex justify-center items-center"
    :class="[
      'bg-main text-white',
      disabled ? 'cursor-not-allowed bg-main/60' : 'hover:bg-main/80'
    ]"
  >
    <span v-if="!loading">{{ label }}</span>
    <slot v-else><Spinner /></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";
import Spinner from "@/components/spinner/Spinner.vue"; // Import your Spinner component

defineProps({
  label: { type: String, required: true }, // Button text
  type: { type: String, default: "submit" }, // Button type (e.g., submit, button, reset)
  disabled: { type: Boolean, default: false }, // Disabled state
  loading: { type: Boolean, default: false }, // Loading state
});
</script>

<style scoped>

</style>
