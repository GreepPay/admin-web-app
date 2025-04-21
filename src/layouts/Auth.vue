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
              class="!h-8"
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

<script setup lang="ts">
  import { ref } from "vue"

  import { AppInfoBox } from "@greep/ui-components"
  interface Props {
    title?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: "Activate Account",
  })

  const email = ref("")
  const password = ref("")
  const confirmPassword = ref("")
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const handleSubmit = () => {
    if (password.value !== confirmPassword.value) return

    // Your form logic here
    console.log("Submitted:", {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })
  }
</script>
