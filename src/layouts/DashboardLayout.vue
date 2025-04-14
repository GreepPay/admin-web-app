<template>
  <div class="min-h-screen flex w-full">
    <Sidebar />

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
  import {
    Sidebar,
    OverviewSection,
    DashboardHeader,
    SidebarProvider,
  } from "../components/Layouts/index.ts"

  export default defineComponent({
    components: { Sidebar, OverviewSection, DashboardHeader, SidebarProvider },
    props: {},
    name: "DashboardLayout",
    setup() {
      const router: any = useRouter()
      const route: any = useRoute()
      const selectedTab = ref("")

      // Set routers
      Logic.Common.SetRouter(router)
      Logic.Common.SetRoute(route)

      // const tabIsActive = (tabName: string) => {
      //   const mainName = tabName;

      //   if (mainName == "base" && router.currentRoute.value.path == "/") {
      //     return true;
      //   } else if (
      //     mainName != "base" &&
      //     router.currentRoute.value.path.includes(mainName)
      //   ) {
      //     selectedTab.value = mainName;
      //     return true;
      //   }
      //   return false;
      // };

      // const goBack = () => {
      //   window.history.length > 1 ? router.go(-1) : router.push("/");
      // };

      // const goToRoute = (route: string) => {
      //   router.push(route);
      // };

      return {
        // transactionMetrics,
        // customerMetrics,
        // merchantMetrics,
        // generalMetrics,
        // tabIsActive,
        // goBack,
        // goToRoute,
      }
    },
  })
</script>
