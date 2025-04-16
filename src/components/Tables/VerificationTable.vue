<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-white">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium text-gray-500"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium text-gray-500"
          >
            Credentials (Click to open)
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
        <tr v-for="merchant in displayedMerchants" :key="merchant.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <img
                :src="merchant.avatar"
                class="w-10 h-10 rounded-full mr-3"
                alt="Merchant avatar"
              />
              <div class="flex items-center space-x-2">
                <div class="font-medium text-gray-900">{{ merchant.name }}</div>
                <div
                  v-if="merchant.status === 'suspended'"
                  class="text-gray-500 text-sm italic"
                >
                  (Suspended)
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ merchant.joinedDate }} • {{ merchant.joinedTime }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <div class="flex justify-end space-x-3">
              <button
                v-if="merchant.status === 'active'"
                @click="$emit('suspend', merchant.id)"
                class="text-amber-500 hover:text-amber-600"
              >
                Suspend
              </button>
              <button
                v-else
                @click="$emit('restore', merchant.id)"
                class="text-green-500 hover:text-green-600"
              >
                Restore
              </button>
              <button
                @click="$emit('delete', merchant.id)"
                class="text-red-500 hover:text-red-600"
              >
                Delete
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

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

  const props = defineProps<{
    merchants: Merchant[]
    currentPage: number
    itemsPerPage: number
  }>()

  defineEmits<{
    (e: "suspend", id: number): void
    (e: "restore", id: number): void
    (e: "delete", id: number): void
  }>()

  // Calculate merchants to display based on pagination
  const displayedMerchants = computed(() => {
    const start = (props.currentPage - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return props.merchants.slice(start, end)
  })
</script>
