<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-100">
    <form
      @submit.prevent="login"
      class="flex flex-col justify-center bg-white p-6 relative"
    >
       <img
          src="../../../assets/logo.png"
          class="absolute top-5 "
          alt="hg"
        />
      <div class="w-full md:w-[70%] mx-auto space-y-4">
        <div class="mb-4">
          <h2 class="text-2xl font-bold">Login</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>
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
          <input type="checkbox" name=""class="mt-0.5" id="">
          Remember me
        </div>
        <button
          type="submit"
          class="w-full bg-main text-white p-2 rounded capitalize"
        >
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
    <div class="hidden md:block bg-white">
      <img
        src="../../../assets/login.avif"
        alt="login image"
        className="h-screen w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";
// const store = useStore();

const email = ref("");
const password = ref("");
const router = useRouter();
const login = async () => {
  // try {
  //   const response = await store.dispatch("auth/login", {
  //     email: email.value,
  //     password: password.value,
  //   });
  //   if (response.status === 200) {
  router.push("/dashboard");
  toast.success("Login Successfully");
  //   }else{
  // toast.error("An error occured")
  //     return;
  //   }
  // } catch (error) {
  //   alert("Login failed");
  // }
};
</script>
