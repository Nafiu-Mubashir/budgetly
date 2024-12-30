<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-white">
    <div class="hidden md:block">
      <div
        class="flex justify-center items-center bg-main w-[95%] mx-auto mt-4 rounded-lg h-[95%]"
      >
        <img
          src="../../../assets/logins.jpg"
          alt="login image"
          class="h-[70%] w-[70%] rounded-lg"
        />
      </div>
    </div>
    <form
      @submit.prevent="login"
      class="flex flex-col justify-center p-6 md:p-3 space-y-12"
    >
      <img
        src="../../../assets/logo.png"
        class="w-32 block mx-auto"
        alt="Logo"
      />
      <div class="w-full md:w-[70%] mx-auto space-y-10 mt-10 md:mt-0">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold">Login</h2>
          <p class="text-xs md:text-sm text-gray-500 font-[200]">
            Welcome back! Please provide your details to login.
          </p>
        </div>
        <div class="space-y-6">
          <Input
            v-model="formData.email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
          />
          <p
            v-if="!emailIsValid && formData.email"
            class="text-red-500 text-sm"
          >
            Please enter a valid email address.
          </p>

          <Input
            v-model="formData.password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <p
            v-if="!passwordIsValid && formData.password"
            class="text-red-500 text-sm"
          >
            Password must be at least 6 characters long.
          </p>

          <!-- Button with loading spinner -->
          <button
            type="submit"
            class="w-full bg-main text-white p-2 py-3 rounded capitalize flex justify-center items-center"
            :disabled="!isFormValid || loading"
            :class="!isFormValid && 'cursor-not-allowed bg-main/60'"
          >
            <span v-if="!loading">Login</span>
            <Spinner v-else />
          </button>

          <p class="text-sm text-center">
            Don't have an account?
            <router-link to="/registration" class="text-main"
              >Sign Up</router-link
            >
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import Input from "@/components/input/Input.vue";
import Spinner from "@/components/spinner/Spinner.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const loading = ref(false);
const formData = ref({
  email: "",
  password: "",
});

// Validation rules
const emailIsValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
);
const passwordIsValid = computed(() => formData.value.password.length >= 6);

// Check if the form is valid
const isFormValid = computed(() => emailIsValid.value && passwordIsValid.value);

const login = async () => {
  loading.value = true; // Show the spinner
 
  try {
    const response = await store.dispatch("auth/login", formData.value);

    if (response.statusCode === 200) {
      toast.success(response.message);
      router.push("/dashboard"); // Redirect to dashboard
      await store.dispatch("auth/fetchUser");
    }
  } catch (error) {
    toast.error(error.response.data.error);
    console.error(error);
  } finally {
    loading.value = false; // Hide the spinner
  }
};
</script>

<style scoped>
</style>
