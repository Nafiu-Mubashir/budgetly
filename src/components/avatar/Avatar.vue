<template>
  <div class="avatar" :style="avatarStyle">
    <span>{{ initials }}</span>
  </div>
</template>
<script setup>
import { computed } from "vue";

// Props for the component
const props = defineProps({
  name: { type: String, required: true }, // The full name to generate initials from
  size: { type: Number, default: 50 }, // Size of the avatar in pixels
  backgroundColor: { type: String, default: "#63BF9C" }, // Background color of the avatar
  textColor: { type: String, default: "#FFFFFF" }, // Text color for the initials
});

// Computed property to generate initials
const initials = computed(() => {
  if (!props.name) return "";
  const parts = props.name.split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0][0].toUpperCase();
});

// Dynamic styles for the avatar
const avatarStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: props.backgroundColor,
  color: props.textColor,
  fontSize: `${props.size / 2.5}px`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  fontWeight: "bold",
}));
</script>

<style scoped>
.avatar {
  text-transform: uppercase;
  overflow: hidden;
  user-select: none;
}
</style>
