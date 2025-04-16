<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-white">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium text-gray-500"
          >
            User
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium text-gray-500"
          >
            Type
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium text-gray-500"
          >
            Balance
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-right text-sm font-medium text-gray-500"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="wallet in wallets" :key="wallet.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <img
                :src="wallet.avatar"
                class="w-10 h-10 rounded-full mr-3"
                alt="Wallet avatar"
              />
              <div class="flex items-center space-x-2">
                <div class="font-medium text-gray-900">{{ wallet.name }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-base text-gray-500">
            {{ wallet.type }}
          </td>
          <td class="px-6 py-4 font-semibold text-xl text-black">$7,400</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <div class="flex justify-end space-x-3">
              <button
                @click="useRouter().push('/wallets/walllet_id/history')"
                class="text-green-500 hover:text-green-600"
              >
                See History
              </button>
              <button
                @click="$emit('delete', wallet.id)"
                class="text-red-500 hover:text-red-600"
              >
                Freeze Account
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { Logic } from "@greep/logic"
  import { useRouter } from "vue-router"

  interface Wallet {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

  const props = defineProps<{
    wallets: Wallet[]
    currentPage: number
    itemsPerPage: number
  }>()

  defineEmits<{
    (e: "suspend", id: number): void
    (e: "restore", id: number): void
    (e: "delete", id: number): void
  }>()

  // Calculate wallets to display based on pagination
  const wallets = computed(() => {
    const start = (props.currentPage - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return props.wallets.slice(start, end)
  })
</script>
