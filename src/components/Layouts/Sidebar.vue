<template>
  <aside
    class="w-64 relative border-r bg-white border-light-gray-two shadow-soft h-screen"
    :class="{ hidden: !isSidebarOpen && isMobile }"
  >
    <!-- LOGO (Top) -->
    <div
      class="p-4 border-b border-light-gray-two sticky top-0 h-[76px] bg-white flex items-center z-10"
    >
      <img src="/images/logo/full-green.svg" />
    </div>

    <!-- MIDDLE SECTION (Scrollable) -->
    <div class="flex-1 overflow-y-auto space-y-5 py-6">
      <div
        v-for="(section, sectionIndex) in sidebarSections"
        :key="sectionIndex"
        class="space-y-2 px-4 pb-6"
        :class="{
          'border-b border-light-gray-two':
            sectionIndex < sidebarSections.length - 1,
        }"
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
      <button
        class="space-x-2 flex items-center w-full"
        @click="Logic.Auth.AdminLogout()"
      >
        <app-icon name="logout" custom-class="h-6 text-sm" />
        <span>Log out</span>
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, inject, ref } from "vue"
  import { useRoute } from "vue-router"
  import { Logic } from "@greep/logic"
  import { AppIcon } from "@greep/ui-components"
  import { sidebarSections } from "../../utils/constants"

  export default defineComponent({
    name: "sidebar",
    components: {
      AppIcon,
    },
    setup() {
      const route = useRoute()
      const isSidebarOpen = inject("isSidebarOpen", ref(true))
      const isMobile = ref(window.innerWidth < 768)

      const getActiveTab = (tabRoute: string) => {
        return route.fullPath.includes(tabRoute)
      }

      return {
        isSidebarOpen,
        isMobile,
        sidebarSections,
        getActiveTab,
        Logic,
      }
    },
  })
</script>
