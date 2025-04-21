<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Logic } from "@greep/logic"
  import { SetFrontendLogic } from "@greep/ui-components"

  export default defineComponent({
    name: "App",
    setup() {
      const router: any = useRouter()
      const route = useRoute()

      // Set routers
      Logic.Common.SetRouter(router)
      Logic.Common.SetRoute(route)

      // Set UI frontend logic
      SetFrontendLogic(Logic)

      // Set app version
      localStorage.setItem("admin_app_version", "1.00")

      // Set app url
      Logic.Common.SetApiUrl(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (import.meta as any).env.VITE_API_URL ?? "http://localhost:3000/graphql"
      )

      const handleMountActions = () => {
        const currentAuthUser = Logic.Auth.AuthUser

        // If user is authenticated
        if (currentAuthUser) {
          Logic.Auth.GetAuthUser()
          if (localStorage.getItem("auth_passcode")) {
            Logic.Common.GoToRoute("/auth/login")
          }
        } else {
          if (!window.location.pathname.includes("/auth")) {
            Logic.Common.GoToRoute("/auth/signup")
          }
        }
      }

      onMounted(() => {
        // handleMountActions()
        // Register watchers
      })

      return {}
    },
  })
</script>
