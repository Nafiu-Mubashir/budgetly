<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden md:block w-60 bg-gray-800 text-white p-4 h-screen">
    <div class="flex flex-col justify-between h-full">
        <ul class="space-y-4 mt-4">
      <li><router-link to="/dashboard" class="block p-2 hover:bg-gray-700">Dashboard</router-link></li>
      <li><router-link to="/dashboard/budgets" class="block p-2 hover:bg-gray-700">Budgets</router-link></li>
      <li><router-link to="/dashboard/transactions" class="block p-2 hover:bg-gray-700">Transactions</router-link></li>
      <li><router-link to="/dashboard/insights" class="block p-2 hover:bg-gray-700">Insights</router-link></li>
    </ul>

    <h1 class="p-2">Logout</h1>
    </div>
  </aside>

  
</template>

<script setup>

</script>
