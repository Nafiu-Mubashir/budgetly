<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden md:block w-60 bg-white text-black p-4 h-screen border-r"
  >
    <div class="flex flex-col justify-between h-full">
      <!-- Sidebar Header -->
      <div class="space-y-10">
        <div class="">
          <img src="../../assets/logo.png" class="block" alt="hg" />
        </div>

        <!-- Navigation Links -->
        <ul class="space-y-4 mt-4">
          <li>
            <router-link
              to="/dashboard"
              class="flex items-center space-x-2 p-2 rounded-md transition hover:bg-main text-black hover:text-white"
               :class="{ 'bg-main text-white rounded-md': isActive('/dashboard'), }"
            >
              <!-- Icon -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 14.5H14M9.38184 2.18771L2.44851 6.87647C2.16713 7.06676 2 7.3748 2 7.70316V16.4784C2 17.3188 2.71634 18 3.6 18H16.4C17.2837 18 18 17.3188 18 16.4784V7.70316C18 7.3748 17.8329 7.06676 17.5515 6.87647L10.6182 2.18771C10.2481 1.93743 9.75193 1.93743 9.38184 2.18771Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- Link Name -->
              <span>Dashboard</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/dashboard/budget"
              class="flex items-center space-x-2 p-2 rounded-md transition hover:bg-main text-black hover:text-white"
               :class="{ 'bg-main text-white rounded-md': isActive('/dashboard/budget'), }"
            >
              <!-- Icon -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.64166 6.19922L10 10.4576L17.3083 6.22422"
                  stroke="currentcolor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 18.0076V10.4492"
                  stroke="currentcolor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.275 2.06706L3.825 4.53373C2.81667 5.09206 1.99167 6.49206 1.99167 7.64206V12.3504C1.99167 13.5004 2.81667 14.9004 3.825 15.4587L8.275 17.9337C9.225 18.4587 10.7833 18.4587 11.7333 17.9337L16.1833 15.4587C17.1917 14.9004 18.0167 13.5004 18.0167 12.3504V7.64206C18.0167 6.49206 17.1917 5.09206 16.1833 4.53373L11.7333 2.05873C10.775 1.53373 9.225 1.53373 8.275 2.06706Z"
                  stroke="currentcolor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- Link Name -->
              <span>Budget</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/dashboard/transaction"
              class="flex items-center space-x-2 p-2 rounded-md transition hover:bg-main text-black hover:text-white"
               :class="{ 'bg-main text-white rounded-md': isActive('/dashboard/transaction'), }"
            >
              <!-- Icon -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.625 2.25H6.375C3.715 2.25 2.25 3.715 2.25 6.375V17.625C2.25 20.285 3.715 21.75 6.375 21.75H17.625C20.285 21.75 21.75 20.285 21.75 17.625V6.375C21.75 3.715 20.285 2.25 17.625 2.25ZM20.25 17.625C20.25 19.465 19.465 20.25 17.625 20.25H6.375C4.535 20.25 3.75 19.465 3.75 17.625V6.375C3.75 4.535 4.535 3.75 6.375 3.75H17.625C19.465 3.75 20.25 4.535 20.25 6.375V17.625ZM12.75 14V17C12.75 17.414 12.414 17.75 12 17.75C11.586 17.75 11.25 17.414 11.25 17V14C11.25 13.586 11.586 13.25 12 13.25C12.414 13.25 12.75 13.586 12.75 14ZM8.75 12V17C8.75 17.414 8.414 17.75 8 17.75C7.586 17.75 7.25 17.414 7.25 17V12C7.25 11.586 7.586 11.25 8 11.25C8.414 11.25 8.75 11.586 8.75 12ZM16.75 15.5V17C16.75 17.414 16.414 17.75 16 17.75C15.586 17.75 15.25 17.414 15.25 17V15.5C15.25 15.086 15.586 14.75 16 14.75C16.414 14.75 16.75 15.086 16.75 15.5ZM16.75 8.12012V10.3201C16.75 10.3301 16.745 10.3379 16.744 10.3479C16.741 10.4359 16.726 10.524 16.692 10.606C16.658 10.688 16.607 10.76 16.548 10.824C16.541 10.832 16.539 10.8421 16.531 10.8491C16.531 10.8491 16.531 10.8491 16.53 10.8491C16.461 10.9181 16.378 10.973 16.286 11.011C16.194 11.049 16.097 11.0691 15.999 11.0691H13.799C13.385 11.0691 13.049 10.7331 13.049 10.3191C13.049 9.90509 13.385 9.56909 13.799 9.56909H14.184L12.385 7.77588L11.098 9.04907C10.514 9.62807 9.56497 9.62497 8.98297 9.04297L7.46899 7.52905C7.17599 7.23605 7.17599 6.76102 7.46899 6.46802C7.76199 6.17502 8.23703 6.17502 8.53003 6.46802L10.044 7.98193L11.331 6.70898C11.916 6.13098 12.864 6.13389 13.444 6.71289L15.25 8.51196V8.11792C15.25 7.70392 15.586 7.36792 16 7.36792C16.414 7.36792 16.75 7.70612 16.75 8.12012Z"
                  fill="currentcolor"
                />
              </svg>
              <!-- Link Name -->
              <span>Transaction</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Logout -->

      <div
        class="flex items-center cursor-pointer space-x-2 hover:bg-[#F11111] group p-2 rounded-md"
        @click="showModal = true"
      >
        <svg
          width="19"
          height="20"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-[#F11111] group-hover:stroke-white"
        >
          <path
            d="M12.5833 6.79922C12.325 3.79922 10.7833 2.57422 7.40834 2.57422H7.30001C3.57501 2.57422 2.08334 4.06589 2.08334 7.79089V13.2242C2.08334 16.9492 3.57501 18.4409 7.30001 18.4409H7.40834C10.7583 18.4409 12.3 17.2326 12.575 14.2826"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 10.5H16.9833"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.125 7.70898L17.9167 10.5007L15.125 13.2923"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <h3 class="text-[#F11111] group-hover:text-white">Logout</h3>
      </div>
    </div>
    <Modal :isVisible="showModal" title="" @close="showModal = false">
      <div class="space-y-6">
        <div class="space-y-3">
          <svg
            width="50"
            height="50"
            class="p-2 rounded-full bg-red-600/20 block mx-auto"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.3919 20.2008C37.3919 29.4075 29.9303 36.8675 20.7253 36.8675C11.5203 36.8675 4.05859 29.4075 4.05859 20.2008C4.05859 10.9975 11.5203 3.53418 20.7253 3.53418C29.9303 3.53418 37.3919 10.9975 37.3919 20.2008Z"
              fill="#DC2626"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.1755 21.2527C22.1755 22.0561 21.5205 22.7111 20.7171 22.7111C19.9138 22.7111 19.2588 22.0561 19.2588 21.2527V13.8861C19.2588 13.0827 19.9138 12.4277 20.7171 12.4277C21.5205 12.4277 22.1755 13.0827 22.1755 13.8861V21.2527ZM19.268 26.5407C19.268 25.7374 19.9197 25.0824 20.718 25.0824C21.5397 25.0824 22.193 25.7374 22.193 26.5407C22.193 27.3441 21.5397 27.9991 20.7347 27.9991C19.9263 27.9991 19.268 27.3441 19.268 26.5407Z"
              fill="white"
            />
          </svg>
          <p class="text-center">Are you sure you want to logout?</p>
        </div>

        <div class="flex justify-between gap-3">
          <button
            type="submit"
            class="bg-red-600 text-white px-4 p-2 rounded"
            @click="logout"
          >
            Yes
          </button>
          <button
            @click="showModal = false"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  </aside>
</template>

<script setup>
import { useLogout } from "@/utils/logout.js";
import { useRoute } from "vue-router";
import Modal from "../modal/Modal.vue";
import { ref } from "vue";

const showModal = ref(false);
// Logout utility
const logout = useLogout();

// Current route for active state
const route = useRoute();

// Determine active link
const isActive = (path) => route.path === path;

// Navigation links with icons
</script>
