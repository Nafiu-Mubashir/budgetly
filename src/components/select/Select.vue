<template>
  <div class="p-6">
    <Select
      v-model="selectedOption"
      :options="options"
      label="Select Budget Duration"
      placeholder="Choose a duration"
      id="budget-duration"
    />
    <p class="mt-4">Selected Option: {{ selectedOption }}</p>
  </div>
</template>

<script setup>
import Select from "@/components/Select.vue";

const options = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "yearly", label: "Yearly" },
];

const selectedOption = ref("");
</script>
