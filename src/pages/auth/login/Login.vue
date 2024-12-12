<template>
  <div class="grid grid-cols-2 h-screen bg-gray-100">
     <form @submit.prevent="login" class="flex flex-col justify-center bg-white p-6 rounded shadow-md">
     <div class="w-[70%] mx-auto">
         <h2 class="text-2xl font-bold mb-4">Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="w-full mb-4 p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full mb-4 p-2 border rounded" required />
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">Login</button>
     </div>
     
    </form>
   <div>image</div>
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
