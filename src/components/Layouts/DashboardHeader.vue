<template>
  <header
    class="border-b z-20 border-light-gray-two sticky top-0 box-shadow bg-white p-4 flex h-[76px] justify-between items-center"
  >
    <div class="flex items-center">
      <!-- <button @click="toggleSidebar" class="md:hidden mr-2">
        <app-icon name="toggler" />
      </button> -->

      <h1 class="md:text-xl font-semibold text-black ml-2">Dashboard</h1>
    </div>

    <div class="flex items-center">
      <div class="text-right mr-4">
        <h2 class="font-medium">
          {{ `${AuthUser.first_name} ${AuthUser.last_name}` }}
        </h2>
        <p class="text-sm text-gray-500">{{ AuthUser.role.name }}</p>
      </div>

      <app-avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import { AppAvatar, AppIcon } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "DashboardHeader",
    components: {
      AppAvatar,
      AppIcon,
    },
    setup() {
      const AuthUser = ref(Logic.Auth.AuthUser)

      return { AuthUser }
    },
  })
</script>
