<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-100">
    <form
      @submit.prevent="register"
      class="flex flex-col justify-center bg-white p-6 rounded shadow-md"
    >
      <img src="../../../assets/logo.png" class="absolute top-5" alt="hg" />
      <div class="w-full md:w-[70%] mx-auto space-y-4">
        <div class="mb-4">
          <h2 class="text-2xl font-bold">Registration</h2>
          <p>Enter your details to register your account</p>
        </div>
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full mb-4 p-2 border rounded"
          required
        />
        <div class="flex items-center gap-1">
          <input type="checkbox" name="" class="mt-0.5" id="" />
          I agree to the Terms & Privacy
        </div>
        <button
          type="submit"
          class="w-full bg-main text-white p-2 rounded capitalize"
        >
          register
        </button>
        <p class="">
          Already have an account
          <router-link to="/login" class="underline text-main"
            >Sign In</router-link
          >
        </p>
      </div>
    </form>
    <div class="hidden md:block">
      <img
        src="../../../assets/reg.jpg"
        alt="login image"
        className="h-screen w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// import api from "../../utils/api";

const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  //   try {
  //     const response = await api.post("/register", { email: email.value, password: password.value });
  //     localStorage.setItem("token", response.data.token);
  router.push("/dashboard");
  //   } catch (error) {
  //     alert("register failed");
  //   }
};
</script>
