<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-white">
    <form
      @submit.prevent="login"
      class="flex flex-col justify-center p-6 relative"
    >
      <img src="../../../assets/logo.png" class="absolute top-5" alt="hg" />
      <div class="w-full md:w-[70%] mx-auto space-y-4 mt-10 md:mt-0">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold">Login</h2>
          <p class="text-xs md:text-sm text-gray-500 font-[200]">
            Welcome back! Please provide your details to login.
          </p>
        </div>
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
          class="w-full bg-main text-white p-2 rounded capitalize flex justify-center items-center"
          :disabled="loading"
        >
          <span v-if="!loading">Login</span>
          <span v-else class="loader"></span>
          <!-- Spinner when loading -->
        </button>

        <p class="text-sm">
          Don't have an account?
          <router-link to="/registration" class="text-main"
            >Sign Up</router-link
          >
        </p>
      </div>
    </form>
    <div class="flex justify-center items-center">
      <div class="hidden md:block">
        <img
          src="../../../assets/logins.jpg"
          alt="login image"
          class="h-[70%] w-[70%]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "@/components/input/Input.vue";
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
    // console.log(response);

    if (response.statusCode === "200") {
      router.push("/dashboard");
      toast.success("Login Successfully");
      // console.log(store.getters["auth/isAuthenticated"]);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
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
  width: 20px;
  height: 20px;
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
