<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-100">
    <form
      @submit.prevent="login"
      class="flex flex-col justify-center bg-white p-6 relative"
    >
      <h1 class="absolute top-5 font-bold text-2xl text-main">Budgetly</h1>
      <div class="w-full md:w-[70%] mx-auto space-y-4">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
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
        <button type="submit" class="w-full bg-main text-white p-2 rounded">
          Login
        </button>
        <p class="">
          Don't have an account?
          <router-link to="/registration" class="underline text-main"
            >Sign Up</router-link
          >
        </p>
      </div>
    </form>
    <div class="hidden md:block">
      <img
        src="../../../assets/login.jpg"
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

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  //   try {
  //     const response = await api.post("/login", { email: email.value, password: password.value });
  //     localStorage.setItem("token", response.data.token);
  router.push("/dashboard");
  //   } catch (error) {
  //     alert("Login failed");
  //   }
};
</script>
