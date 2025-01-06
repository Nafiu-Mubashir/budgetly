<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  display: inline-block; /* Ensure inline display for use in buttons */
  border: 2px solid transparent;
  border-top: 2px solid #fff; /* Default color */
  border-radius: 50%;
  width: 1.5rem; /* Size adjustment */
  height: 1.5rem; /* Size adjustment */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
