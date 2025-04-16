<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader rightSideClass="flex-1 " titleClass="flex-1">
        <template #title>
          <div
            role="button"
            class="flex items-center space-x-2 w-fit cursor-pointer"
            @click="Logic.Common.GoToRoute('/wallets')"
          >
            <app-icon name="arrow-left-2" />
            <span
              class="text-base flex items-center justify-center font-medium h-full"
            >
              Wallets History
            </span>
          </div>
        </template>

        <div class="flex-1 flex items-center h-full">
          <div class="flex-1 flex items-center px-6 space-x-3 border-r">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              class="w-9 h-9 rounded-full"
              alt="User avatar"
            />
            <h3 class="font-medium text-black">Daniel Script</h3>
          </div>

          <div class="flex-1 flex items-center px-6 space-x-3">
            <p class="font-normal text-black">Wallet Balnce</p>
            <p class="font-bold text-black">$2,000.00</p>
          </div>
        </div>
      </AppTableHeader>

      <!-- search and pagination -->
      <AppTableHeader titleClass="flex-1 !py-0 !px-0">
        <template #title>
          <div>
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
            />
          </div>
        </template>

        <div class="h-full px-6">
          <AppPagination
            :current-page="currentPage"
            :items-per-page="10"
            :total-items="125"
            @update:page="handlePageChange"
          />
        </div>
      </AppTableHeader>

      <AppWalletHistoryTable
        :users="filteredUsers"
        @see-history="seeHistory"
        @freeze="freezeUser"
      />
    </AppTableContainer>

    <!-- <AppModal
      :isOpen="showDetails"
      :title="'Merchant Withdrawal'"
      :showTitle="true"
      :showFooter="false"
      @close="showDetails = false"
    >
      <div class="bg-green-600 text-white text-center py-4 rounded-md mb-4">
        <p class="text-sm">Amount</p>
        <h1 class="text-2xl font-bold">$200.00</h1>
      </div>

      <ul class="text-sm text-gray-700 space-y-2">
        <li class="flex justify-between">
          <span>Merchant</span
          ><span class="font-medium">Timms Closet Ventures</span>
        </li>
        <li class="flex justify-between">
          <span>Acc. Name</span><span class="font-medium">Timmy Salami</span>
        </li>
        <li class="flex justify-between">
          <span>Acc. Number</span><span>801***4006</span>
        </li>
      </ul>
    </AppModal> -->
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import {
    AppWalletHistoryTable,
    AppDropdown,
    AppTableHeader,
    AppStatCard,
    AppTableContainer,
    AppIcon,
    AppSearch,
    AppPagination,
    AppTabs,
    AppModal,
    AppTransactionDetails,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  const selectedFilterOption = ref("all_time")
  const activeTab = ref("all")
  const showDetails = ref(false)

  const dropdownOptions = [
    { label: "All Time", value: "all_time" },
    { label: "Today", value: "daily" },
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ]

  const tabs = [
    { key: "all", label: "All" },
    { key: "users", label: "Merchants" },
    { key: "customers", label: "Customers" },
  ]

  type UserType = "Merchant" | "Customer"

  interface WalletUser {
    id: string // Unique identifier for keying lists
    name: string
    type: UserType
    avatar?: string // Optional if not every user has one
    balance: number
  }

  // Sample merchant data
  const users = ref<WalletUser[]>([
    {
      id: "1",
      name: "Arlene McCoy",
      type: "Merchant",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      balance: 7400,
    },
    {
      id: "2",
      name: "Floyd Miles",
      type: "Merchant",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      balance: 1380,
    },
  ])

  const searchQuery = ref("")
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(50) // Total number of users

  // Filter users based on search query
  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value

    const query = searchQuery.value.toLowerCase()
    return users.value.filter((merchant) =>
      merchant.name.toLowerCase().includes(query)
    )
  })

  const seeHistory = (id: string) => {
    console.log(id)

    // Logic.Common.GoToRoute(`/wallets/${id}`)
  }

  // Methods for handling merchant actions
  const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
  }

  const freezeUser = (merchantId: string) => {
    users.value = users.value.filter((m) => m.id !== merchantId)
  }
</script>
