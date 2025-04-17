import { createApp } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import routes from "./router/index"
import "./assets/styles/index.css"
import { Logic } from "@greep/logic"

import App from "./App.vue"

// UI component css style
import "@greep/ui-components/dist/library.min.css"

// Layouts
import DashboardLayout from "./layouts/Dashboard.vue"

routes.then((routes) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: routes.filter((route) => route !== null) as RouteRecordRaw[],
  })

  router.beforeEach((to, from, next) => {
    const toRouter: any = to
    const fromRouter: any = from
    return Logic.Common.preFetchRouteData(toRouter, next, fromRouter)
  })

  const app = createApp(App)
    .component("dashboard-layout", DashboardLayout)
    .use(router)

  app.mount("#app")
})
