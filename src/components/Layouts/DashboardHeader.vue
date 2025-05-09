<template>
  <header
    class="border-b z-10 border-light-gray-two sticky top-0 box-shadow bg-white p-4 flex h-[76px] justify-between items-center"
  >
    <div class="flex items-center">
      <!-- <button @click="toggleSidebar" class="md:hidden mr-2">
        <app-icon name="toggler" />
      </button> -->

      <h1 class="md:text-xl font-semibold text-black ml-2">
        {{ routeHeader }}
      </h1>
    </div>

    <div class="flex items-center">
      <div class="text-right mr-4">
        <h2 class="font-medium">
          {{ `${AuthUser.first_name} ${AuthUser.last_name}` }}
        </h2>
        <p class="text-sm text-gray-500">{{ AuthUser.role.name }}</p>
      </div>

      <app-avatar
        :src="AuthUser?.profile?.profile_picture"
        :name="`${AuthUser?.first_name} ${AuthUser?.last_name}`"
      />
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from "vue"
  import { AppAvatar, AppIcon } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { useRoute } from "vue-router"
  import { sidebarSections } from "../../utils/constants"

  export default defineComponent({
    name: "DashboardHeader",
    components: {
      AppAvatar,
      AppIcon,
    },
    setup() {
      const route = useRoute()
      const AuthUser = ref(Logic.Auth.AuthUser)

      const routeHeader = computed(() => {
        const path = route.path
        const firstSegment = "/" + path.split("/").filter(Boolean)[0]

        for (const section of sidebarSections) {
          for (const item of section.items) {
            if (item.route === firstSegment) {
              return item.title
            }
          }
        }

        // fallback: capitalize first segment
        const fallback = firstSegment.replace("/", "")
        return fallback.charAt(0).toUpperCase() + fallback.slice(1)
      })

      onMounted(() => {
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      return { AuthUser, routeHeader }
    },
  })
</script>
