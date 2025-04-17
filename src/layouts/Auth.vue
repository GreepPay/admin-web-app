<template>
  <div class="flex min-h-screen">
    <!-- Left Section -->
    <div class="w-1/2 bg-green relative">
      <div class="inset-0 -mt-8 w-full h-full flex items-center justify-center">
        <img src="/images/logo/icon-white.svg " />
      </div>
    </div>

    <!-- Right Section - Form -->
    <div class="w-1/2 flex items-center justify-center bg-white p-8">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center mb-10">
          <div class="flex items-center gap-2">
            <div class="bg-greep-light p-1 rounded-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#10B981" />
                <path
                  d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M15 10L11 14L9 12"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="font-semibold">Greep Admin</span>
          </div>
          <button
            class="text-greep hover:text-greep-dark hover:bg-greep-light/30 px-3 py-1 rounded-md"
          >
            Activate Account
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit">
          <!-- ID Field -->
          <div class="mb-6">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >ID</label
            >
            <input
              id="email"
              type="email"
              v-model="email"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <!-- Password Field -->
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Enter strong password"
                v-model="password"
                class="w-full pr-10 border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                @click="showPassword = !showPassword"
              >
                <!-- <component :is="showPassword ? 'EyeOffIcon' : 'EyeIcon'" class="w-5 h-5" /> -->
              </button>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="mb-10">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                placeholder="Enter password again"
                v-model="confirmPassword"
                class="w-full pr-10 border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <!-- <component :is="showConfirmPassword ? 'EyeOffIcon' : 'EyeIcon'" class="w-5 h-5" /> -->
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium h-14 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"

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
