<template>
  <div class="min-h-screen flex w-full">
    <div class="w-64 brrder-r">
      <sidebar />
    </div>

    <main class="flex-1 bg-white">
      <dashboard-header />

      <div class="container mx-auto p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import { Sidebar, DashboardHeader } from "../components/Layouts/index"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "AppDashboardLayout",
    components: { Sidebar, DashboardHeader },
    setup() {
      const AuthUser = ref(Logic.Auth.AuthUser)
      return { AuthUser }
    },
  })
</script>
