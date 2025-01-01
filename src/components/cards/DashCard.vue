<template>
  <div class="bg-white rounded-lg shadow p-4 space-y-4">
    <!-- Icon Section -->
    <div
      class="flex w-10 h-10 shadow-md rounded-md justify-center items-center"
    >
      <Wallet color="#63BF9C" size="30" v-if="title === 'Total Budget'" />
      <WalletMinimal color="#63BF9C" size="30" v-if="title === 'Balance'" />
      <FileDown color="#63BF9C" size="30" v-if="title === 'Total Income'" />
      <FileUp color="#63BF9C" size="30" v-if="title === 'Total Expenses'" />
      <component :is="icon" color="#63BF9C" size="30" v-if="icon" />
    </div>
    <!-- Text Content Section -->
    <div>
      <p class="text-sm font-medium text-gray-500">{{ title }}</p>
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold mt-2">${{ commaFormatter(value) }}</p>
        <p
          :class="[
            'text-sm font-medium mt-1 w-12 text-center rounded-lg p-.5',
            growthType === 'positive'
              ? 'bg-main/30 text-black'
              : 'bg-red-200 text-red-500',
          ]"
        >
          {{ growth }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { commaFormatter } from "@/utils/formatter";
import { FileDown, FileUp, Wallet, WalletMinimal } from "lucide-vue-next";

defineProps({
  title: String, // Title of the card
  value: String, // Value displayed in the card
  growth: String, // Growth percentage (+ or -)
  growthType: { type: String, default: "positive" }, // Type of growth (positive/negative)
  icon: { type: Object, default: null }, // Icon (SVG or component)
});
</script>

<style scoped>
.text-main {
  color: #1d4ed8; /* Adjust this to match your brand color */
}
</style>
