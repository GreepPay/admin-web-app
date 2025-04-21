<template>
  <div class="flex min-h-screen">
    <!-- Left Section -->
    <div
      class="w-1/2 relative bg-[url('/images/auth-image.jpg')] bg-cover bg-center z-0"
    >
      <!-- Green overlay -->
      <div class="absolute inset-0 bg-green/80 z-0"></div>

      <!-- Content above overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center select-none -mt-8 z-10"
      >
        <img src="/images/logo/icon-white.svg" alt="Logo" />
      </div>
    </div>

    <!-- Right Section - Form -->
    <div class="w-1/2 flex items-center justify-center bg-white p-8">
      <div class="flex flex-col my-auto space-y-3 w-[480px]">
        <app-info-box>
          <div class="flex w-full items-center justify-between space-x-4">
            <img
              src="/images/logo/greep-admin.svg"
              custom-class="!h-8"
              alt="Admin Logo"
            />
            <h3 class="flex-1 text-right text-black text-xl font-semibold">
              {{ title }}
            </h3>
          </div>
        </app-info-box>

        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { AppInfoBox } from "@greep/ui-components"

  export default defineComponent({
    name: "AppAuthLayout",
    components: { AppInfoBox },
    props: {
      title: {
        type: String,
        default: "Activate Account",
      },
    },
    setup() {
      return {}
    },
  })
</script>
