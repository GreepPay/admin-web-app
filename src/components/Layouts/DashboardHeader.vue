<template>
  <header
    class="border-b border-light-gray-two sticky top-0 box-shadow bg-white p-4 flex h-[76px] justify-between items-center"
  >
    <div class="flex items-center">
      <button @click="toggleSidebar" class="md:hidden mr-2">
        <app-icon name="toggler" />
      </button>

      <h1 class="md:text-xl font-semibold text-black ml-2">Dashboard</h1>
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
