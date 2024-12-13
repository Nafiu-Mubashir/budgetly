<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden md:block w-60 bg-gray-800 text-white p-4 h-screen">
    <div class="flex flex-col justify-between h-full">
      <div class="space-y-10">
        <h1 class="uppercase font-bold text-2xl">Budgetly</h1>
        <ul class="space-y-4 mt-4">
          <li>
            <router-link
              to="/dashboard"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/budget"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Budgets</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/transaction"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Transactions</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/insight"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Insights</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard/profile"
              class="block p-2 hover:bg-gray-700 rounded-md"
              >Profile</router-link
            >
          </li>
        </ul>
      </div>

      <h1 class="p-2">Logout</h1>
    </div>
  </aside>
</template>

<script setup></script>
