<template>
  <div class="overflow-x-auto">
    <!-- <table class="min-w-full divide-y divide-gray-200">
      <colgroup>
        <col class="w-1/2" />
        <col class="w-1/6" />
        <col class="w-1/6" />
      </colgroup>

      <thead class="bg-white">
        <tr>
          <th class="px-6 py-3 text-left font-medium text-gray-500">Name</th>
          <th class="px-6 py-3 text-left font-medium text-gray-500">Joined</th>
          <th class="px-6 py-3 text-right font-medium text-gray-500">
            Actions
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="merchant in displayedMerchants" :key="merchant.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center space-x-3">
              <img
                :src="merchant.avatar"
                class="w-10 h-10 rounded-full"
                alt="Merchant avatar"
              />

              <div class="flex items-center space-x-2">
                <div class="font-medium text-black">{{ merchant.name }}</div>
                <div
                  v-if="merchant.status === 'suspended'"
                  class="text-very-light-gray"
                >
                  (Suspended)
                </div>
              </div>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-very-light-gray">
            {{ merchant.joinedDate }} • {{ merchant.joinedTime }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <div class="flex justify-end space-x-3">
              <span
                role="button"
                v-if="merchant.status === 'active'"
                @click="$emit('suspend', merchant.id)"
                class="text-orange hover:opacity-80"
              >
                Suspend
              </span>
              <span
                role="button"
                v-else
                @click="$emit('restore', merchant.id)"
                class="text-green hover:opacity-80"
              >
                Restore
              </span>
              <span
                role="button"
                @click="$emit('delete', merchant.id)"
                class="text-red hover:opacity-80"
              >
                Delete
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table> -->

    <AppMerchantTable />
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
