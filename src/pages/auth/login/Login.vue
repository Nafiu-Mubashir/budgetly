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
      <img src="../../../assets/logo.png" class="w-32 block mx-auto" alt="hg" />
      <div class="w-full md:w-[70%] mx-auto space-y-10 mt-10 md:mt-0">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold">Login</h2>
          <p class="text-xs md:text-sm text-gray-500 font-[200]">
            Welcome back! Please provide your details to login.
          </p>
        </div>
        <div class="space-y-6">
          <Input
            v-model="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            v-model="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <!-- Button with loading spinner -->
          <button
            type="submit"
            class="w-full bg-main text-white p-2 py-3 rounded capitalize flex justify-center items-center"
            :disabled="loading"
          >
            <span v-if="!loading">Login</span>
            <Spinner v-else />
            <!-- Spinner when loading -->
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";

const store = useStore();
const email = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);

const login = async () => {
  loading.value = true; // Show the spinner

  try {
    const response = await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });

    if (response.statusCode === "200") {
      // Fetch user data after successful login
      await store.dispatch("auth/fetchUser");
      toast.success("Login successful");
      router.push("/dashboard"); // Redirect to dashboard
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    console.error(error);
  } finally {
    loading.value = false; // Hide the spinner
  }
};
</script>

<style scoped>
.loader {
  border: 2px solid transparent;
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
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
