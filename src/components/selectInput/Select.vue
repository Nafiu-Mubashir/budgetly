<template>
  <div class="relative">
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <!-- Select Dropdown -->
    <div
      class="relative w-full"
      :class="{ 'cursor-not-allowed opacity-50': disabled }"
    >
      <button
        type="button"
        class="w-full text-left bg-white border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none border-main focus:shadow-sm focus:shadow-main"
        @click="toggleDropdown"
        :disabled="disabled"
      >
        {{ selectedOption?.label || placeholder }}
        <span class="absolute right-4 top-2.5 text-gray-500"> <ChevronDown /> </span>
      </button>
      <!-- Dropdown Options -->
      <ul
        v-show="isOpen"
        class="absolute z-10 mt-2 w-full bg-white border rounded max-h-40 overflow-y-auto"
      >
        <li
          class="px-4 py-2 cursor-pointer"
          disabled
        >
        </li>
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-2 cursor-pointer hover:bg-main hover:text-white"
          :class="{
            'bg-main text-white': option.value === selectedOption?.value,
          }"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <!-- Error Message -->
    <p v-if="error" class="mt-2 text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ChevronDown } from 'lucide-vue-next';

// Props
const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  options: { type: Array, required: true },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Select an option" },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

// Emitters
const emit = defineEmits(["update:modelValue"]);

// State
const isOpen = ref(false);
const selectedOption = ref(null);

// Set selectedOption based on modelValue
const initializeSelectedOption = () => {
  const matchedOption = props.options.find(
    (option) => option.value === props.modelValue
  );
  selectedOption.value = matchedOption || null;
};

// Watch for external changes to modelValue and re-initialize
watch(
  () => props.modelValue,
  (newValue) => {
    initializeSelectedOption();
  }
);

// Initialize selected option on mount
initializeSelectedOption();

// Toggle dropdown
const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

// Select an option
const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
  emit("update:modelValue", option.value); // Emit only the value
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
