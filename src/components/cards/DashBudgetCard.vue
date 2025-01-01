<template>
  <div class="bg-white rounded-lg shadow p-4">
    <p class="text-sm text-gray-500 capitalize">{{ title }}</p>
    <p class="text-lg font-bold">${{ commaFormatter(amount) }}</p>
  </div>
</template>

<script setup>
import { commaFormatter } from "@/utils/formatter";
defineProps({
  title: String,
  amount: String,
});
</script>
