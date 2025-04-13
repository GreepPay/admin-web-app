<template>
  <header
    class="border-b border-gray-200 bg-white p-4 flex justify-between items-center"
  >
    <div class="flex items-center">
      <button @click="toggleSidebar" class="md:hidden mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold ml-2">Dashboard</h1>
    </div>
    <div class="flex items-center">
      <div class="text-right mr-4">
        <h2 class="font-medium">Ralph Edwards</h2>
        <p class="text-sm text-gray-500">Super Admin</p>
      </div>
      <div class="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { inject } from "vue"

  const toggleSidebar = inject("toggleSidebar", () => {})
</script>
