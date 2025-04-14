<template>
  <aside
    class="w-64 relative border-r border-light-gray-two shadow-soft bg-white h-screen hidden md:flex flex-col"
    :class="{ hidden: !isSidebarOpen && isMobile }"
  >
    <!-- LOGO (Top) -->
    <div
      class="p-4 border-b border-light-gray-two sticky top-0 h-[76px] bg-white flex items-center z-10"
    >
      <img src="/images/greep-logo.svg" />
    </div>

    <!-- MIDDLE SECTION (Scrollable) -->
    <div class="flex-1 overflow-y-auto space-y-5 py-6">
      <div
        v-for="(section, sectionIndex) in sidebarSections"
        :key="sectionIndex"
        class="space-y-2 px-4 pb-6"
        :class="
          sectionIndex < sidebarSections.length -1 &&
          'border-b border-light-gray-two'
        "
      >
        <h2 class="text-base text-light-black py-2 px-2 font-medium">
          {{ section.title }}
        </h2>

        <ul class="space-y-2">
          <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
            <span
              class="flex items-center cursor-pointer py-2 px-2 rounded-lg text-sm space-x-2"
              :class="
                getActiveTab(item.route)
                  ? 'text-black font-semibold'
                  : 'text-very-light-gray hover:bg-light-gray-two'
              "
              @click="Logic.Common.GoToRoute(item.route)"
            >
              <app-icon
                :name="
                  getActiveTab(item.route)
                    ? `${item.icon}-active`
                    : `${item.icon}-inactive`
                "
                custom-class="h-6"
              />
              <span> {{ item.title }} </span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- LOGOUT (Bottom) -->
    <div
      class="h-[76px] border-t border-light-gray-two bg-white flex items-center px-6"
    >
      <button class="space-x-2 flex items-center w-full">
        <app-icon name="logout" custom-class="h-6 text-sm" />
        <span>Log out</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { inject, ref, computed, onMounted } from "vue"
  import { Logic } from "@greep/logic"
  import { AppIcon } from "@greep/ui-components"
  import { useRoute } from "vue-router"

  const isSidebarOpen = inject("isSidebarOpen", ref(true))
  const isMobile = ref(window.innerWidth < 768)

  const getActiveTab = (route: string) => useRoute().fullPath.includes(route)

  const sidebarSections = ref([
    {
      title: "General",
      items: [
        { title: "Dashboards", icon: "dashboards", route: "/dashboards" },
        { title: "Analytics", icon: "graph", route: "/analytics" },
        { title: "Transactions", icon: "trend-up", route: "/transactions" },
        { title: "Wallets", icon: "wallet-3", route: "/wallets" },
      ],
    },
    {
      title: "Accounts",
      items: [
        { title: "Merchant", icon: "building", route: "/merchants" },
        { title: "Customer", icon: "user", route: "/customers" },
        { title: "Admin", icon: "shield-security", route: "/admin" },
      ],
    },
    {
      title: "Merchant",
      items: [
        {
          title: "Verification",
          icon: "personal-card",
          route: "/verification",
        },
        { title: "Withdrawal", icon: "money-recieve", route: "/withdrawal" },
      ],
    },
  ])
</script>
