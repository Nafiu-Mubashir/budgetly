<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen bg-white">
    <div class="hidden md:block">
      <div
        class="flex justify-center items-center bg-main w-[95%] mx-auto mt-4 rounded-lg h-[95%]"
      >
        <img
          src="../../../assets/regs.jpg"
          alt="login image"
          class="h-[70%] w-[70%] rounded-lg"
        />
      </div>
    </div>
    <form
      @submit.prevent="register"
      class="flex flex-col justify-center p-6 md:p-3 space-y-12"
    >
      <img src="../../../assets/logo.png" class="w-32 block mx-auto" alt="hg" />
      <div class="w-full md:w-[70%] mx-auto space-y-10 mt-10 md:mt-0">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold">Create your account</h2>
          <p class="text-xs md:text-sm text-gray-500 font-[200]">
            Ready to spend wisely? Sign up It's free and totally worth it!
          </p>
        </div>
        <div class="space-y-6">
          <Input
            v-model="formData.username"
            type="text"
            placeholder="Enter your username"
          />
          <div>
            <Input
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
            />
            <p
              v-if="!emailIsValid && formData.email"
              class="text-red-500 text-sm"
            >
              Please enter a valid email address.
            </p>
          </div>
          <div>
            <Input
              v-model="formData.password"
              type="password"
              placeholder="Enter your password"
            />
            <p
              v-if="!passwordIsValid && formData.password"
              class="text-red-500 text-sm mt-0"
            >
              Password must be at least 6 characters long.
            </p>
          </div>
          <div class="text-center text-xs text-gray-400">
            <p>By continuing, you accept our</p>
            <p>
              <span class="text-main">Terms of Service</span> and
              <span class="text-main">Privacy Policy</span>.
            </p>
          </div>

          <!-- Button with loading spinner -->

          <Button
            label="register"
            :loading="loading"
            :disabled="!isFormValid || loading"
          />

          <p class="text-sm text-center">
            Already have an account
            <router-link to="/login" class="text-main">Sign In</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import Input from "@/components/input/Input.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";
import Button from "@/components/button/Button.vue";

const store = useStore();

const formData = ref({
  username: "",
  email: "",
  password: "",
});
const router = useRouter();
const loading = ref(false);
// Validation rules
const emailIsValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
);
const passwordIsValid = computed(() => formData.value.password.length >= 6);
// Check if the form is valid
const isFormValid = computed(() => emailIsValid.value && passwordIsValid.value);

const register = async () => {
  loading.value = true; // Show the spinner

  try {
    const response = await store.dispatch("auth/register", formData.value);
    if (response.statusCode === 200) {
      toast.success(response.message);
      setTimeout(() => {
        router.push("/login"); // Redirect to dashboard
      }, 1000);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  } finally {
    loading.value = false; // Hide the spinner
  }
};
</script>

<style scoped></style>
