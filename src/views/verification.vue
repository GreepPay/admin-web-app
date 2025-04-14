<template>
  <dashboard-layout>
    <div class="bg-white border rounded-lg box-shadow">
      <div class="flex justify-between items-center h-16 border-b">
        <h2
          class="text-lg flex items-center justify-center px-6 font-medium border-r h-full i"
        >
     Verify Merchants
        </h2>

        <div class="flex flex-1 items-center space-x-3 border-r px-6 h-full">
          <app-icon name="search" />
          <input
            type="search"
            placeholder="Search..."
            v-model="searchQuery"
            class="py-2 w-full border-none outline-none focus:outline-none focus:border-none"
          />
        </div>

        <div class="flex justify-between items-center px-3">
          <div class="text-sm text-gray-500">
            {{ paginationText }}
          </div>

          <div class="flex space-x-2 items-center">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="p-2 rounded-md disabled:opacity-50"
              :class="
                currentPage === 1
                  ? 'text-gray-300'
                  : 'text-gray-700 hover:bg-gray-100'
              "
            >
              <app-icon name="alt-arrow-left" custom-class="h-4" />
            </button>

            <p class="w-[1px] h-5 bg-light-gray-two"></p>

            <button
              @click="nextPage"
              :disabled="isLastPage"
              class="p-2 disabled:opacity-50"
              :class="
                isLastPage ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'
              "
            >
              <app-icon name="alt-arrow-right" custom-class="h-5  " />
            </button>
          </div>
        </div>
      </div>

      <VerificationTable
        :merchants="filteredMerchants"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @suspend="suspendMerchant"
        @restore="restoreMerchant"
        @delete="deleteMerchant"
      />
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import VerificationTable from "../components/VerificationTable.vue"
  import { AppIcon } from "@greep/ui-components"

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string

    joinedTime: string
    status: "active" | "suspended"
  }

  // Sample merchant data
  const merchants = ref<Merchant[]>([
    {
      id: 1,
      name: "Arlene McCoy",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "suspended",
    },
    {
      id: 3,
      name: "Ralph Edwards",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 4,
      name: "Jerome Bell",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "suspended",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "suspended",
    },
    {
      id: 6,
      name: "Sadie Thomas",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 7,
      name: "Cameron Williamson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 8,
      name: "Kristin Watson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 9,
      name: "Mcrory Adams",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 10,
      name: "Stalline Dre",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
  ])

  const searchQuery = ref("")
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(50) // Total number of merchants

  // Filter merchants based on search query
  const filteredMerchants = computed(() => {
    if (!searchQuery.value) return merchants.value

    const query = searchQuery.value.toLowerCase()
    return merchants.value.filter((merchant) =>
      merchant.name.toLowerCase().includes(query)
    )
  })

  // Calculate whether we're on the last page
  const isLastPage = computed(() => {
    return currentPage.value * itemsPerPage.value >= totalItems.value
  })

  // Create pagination text (e.g., "1-10 of 50")
  const paginationText = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1
    const end = Math.min(
      currentPage.value * itemsPerPage.value,
      totalItems.value
    )
    return `${start}-${end} of ${totalItems.value}`
  })

  // Handle pagination
  const nextPage = () => {
    if (!isLastPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  // Methods for handling merchant actions
  const suspendMerchant = (merchantId: number) => {
    const merchant = merchants.value.find((m) => m.id === merchantId)
    if (merchant) {
      merchant.status = "suspended"
    }
  }

  const restoreMerchant = (merchantId: number) => {
    const merchant = merchants.value.find((m) => m.id === merchantId)
    if (merchant) {
      merchant.status = "active"
    }
  }

  const deleteMerchant = (merchantId: number) => {
    merchants.value = merchants.value.filter((m) => m.id !== merchantId)
  }
</script>
