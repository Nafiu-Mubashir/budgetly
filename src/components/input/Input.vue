<template>
  <div class="w-full mb-4">
    <!-- Label -->
    <label
      :for="id"
      class="block mb-1 text-sm font-medium"
    >
      {{ label }}
    </label>
    <!-- Input Field -->
    <div class="relative">
      <input
        :id="id"
        :type="showPassword ? 'text' : type"
        :placeholder="placeholder"
        class="w-full p-2 py-3 border rounded focus:outline-none border-main focus:shadow-sm focus:shadow-main placeholder:text-sm"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <!-- Toggle Password Visibility -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
      >
        <span v-if="showPassword">🙈</span>
        <span v-else>👁️</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

defineProps({
  id: { type: String, required: true }, // Input ID
  label: { type: String, required: true }, // Label text
  type: { type: String, default: "text" }, // Input type (e.g., text, password, email)
  placeholder: { type: String, default: "" }, // Placeholder text
  modelValue: { type: [String, Number], required: true }, // v-model binding
});

const showPassword = ref(false); // State for password visibility

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
