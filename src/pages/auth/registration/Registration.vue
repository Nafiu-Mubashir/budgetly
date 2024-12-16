<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-100">
    <form
      @submit.prevent="register"
      class="flex flex-col justify-center bg-white p-6 rounded shadow-md"
    >
      <div class="w-full md:w-[70%] mx-auto space-y-4">
        <h2 class="text-2xl font-bold mb-4">Registration</h2>
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
        <button type="submit" class="w-full bg-main text-white p-2 rounded">
          register
        </button>
        <p class="">
          Already have an account
          <router-link to="/login" class="underline">Sign In</router-link>
        </p>
      </div>
    </form>
    <div class="hidden md:block">image</div>
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
