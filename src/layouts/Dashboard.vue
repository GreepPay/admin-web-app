<template>
  <div class="min-h-screen flex w-full">
    <div class="w-64 brrder-r">
      <sidebar />
    </div>

    <main class="flex-1 bg-white">
      <!-- <AppLoader v-if="loaderSetup.show" :setup="loaderSetup" /> -->
      <dashboard-header />

      <div class="container mx-auto p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue"
  import { Sidebar, DashboardHeader } from "../components/Layouts/index"
  import { Logic } from "@greep/logic"
  import { AppLoader } from "@greep/ui-components"

  export default defineComponent({
    name: "AppDashboardLayout",
    components: { Sidebar, DashboardHeader, AppLoader },
    setup() {
      const AuthUser = ref(Logic.Auth.AuthUser)
      const loaderSetup = ref(Logic.Common.loaderSetup)

      onMounted(() => {
        // watchers
        // Logic.Common.watchProperty("loaderSetup", loaderSetup)
      })

      return { AuthUser, loaderSetup }
    },
  })
</script>
