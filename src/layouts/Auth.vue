<template>
  <div class="min-h-screen flex w-full">
    <!--  -->
    <div class="w-64 brrder-r">
      <Sidebar />
    </div>

    <main class="flex-1 bg-white">
      <DashboardHeader />

      <div class="container mx-auto p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import { Logic } from "@greep/logic"
  import { ref, defineComponent } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Sidebar, DashboardHeader } from "../components/Layouts/index"

  export default defineComponent({
    components: { Sidebar, DashboardHeader },
    props: {},
    name: "AuthLayout",
    setup() {
      const router: any = useRouter()
      const route: any = useRoute()
      const selectedTab = ref("")

      // Set routers
      Logic.Common.SetRouter(router)
      Logic.Common.SetRoute(route)

      return {}
    },
  })
</script>
