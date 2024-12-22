<template>
  <div class="bg-white rounded-lg shadow p-4">
    <p class="text-sm text-gray-500">{{ title }}</p>
    <p class="text-lg font-bold">{{ amount }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  amount: String,
});
</script>
