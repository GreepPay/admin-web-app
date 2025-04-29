<template>
  <header
    class="border-b z-20 border-light-gray-two sticky top-0 box-shadow bg-white p-4 flex h-[76px] justify-between items-center"
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

      <app-avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { AppAvatar, AppIcon } from "@greep/ui-components"

  export default defineComponent({
    name: "DashboardHeader",
    components: {
      AppAvatar,
      AppIcon,
    },
    setup() {
      const toggleSidebar = () => {
        console.log("Sidebar toggled") // Replace this with actual toggle logic
      }

      return {
        toggleSidebar,
      }
    },
  })
</script>
