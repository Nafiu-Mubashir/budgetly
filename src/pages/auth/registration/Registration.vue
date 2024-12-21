<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-white">
    <form
      @submit.prevent="register"
      class="flex flex-col justify-center p-6 relative"
    >
      <img src="../../../assets/logo.png" class="absolute top-5" alt="hg" />
      <div class="w-full md:w-[70%] mx-auto space-y-4 mt-10 md:mt-0">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold">Registration</h2>
          <p class="text-xs md:text-sm text-gray-500 font-[200]">
            Let's meet you. Enter your details as they appear on your legal
            documentation
          </p>
        </div>
        <Input
          v-model="username"
          type="text"
          placeholder="Enter your username"
        />
        <Input v-model="email" type="email" placeholder="Enter your email" />
        <Input
          v-model="password"
          type="password"
          placeholder="Enter your password"
        />
        <div class="text-center md:text-left text-xs text-gray-400">
          <p>By continuing, you accept our</p>
          <p><span class="text-main">Terms of Service</span> and <span class="text-main">Privacy Policy</span>.</p>
        </div>

        <!-- Button with loading spinner -->
        <button
          type="submit"
          class="w-full bg-main text-white p-2 rounded capitalize flex justify-center items-center"
          :disabled="loading"
        >
          <span v-if="!loading">register</span>
          <span v-else class="loader"></span>
          <!-- Spinner when loading -->
        </button>

        <p class="text-sm">
          Already have an account
          <router-link to="/login" class="text-main"
            >Sign In</router-link
          >
        </p>
      </div>
    </form>
    <div class="flex justify-center items-center">
      <div class="hidden md:block">
        <img
          src="../../../assets/regs.png"
          alt="login image"
          className="h-full w-[75%"
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

const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);

const register = async () => {
  loading.value = true; // Show the spinner

  try {
    const response = await store.dispatch("auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    console.log(response);

    if (response.statusCode === "200") {
      router.push("/login");
      toast.success(response.message);
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
