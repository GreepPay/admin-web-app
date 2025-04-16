<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader rightSideClass="flex-1">
        <template #title>
          <div class="flex items-center space-x-4">
            <h2
              class="text-lg flex items-center justify-center px-2 font-medium h-full"
            >
              Transactions
            </h2>

            <app-tabs :tabs="tabs" v-model:activeTab="activeTab" />
          </div>
        </template>

        <div class="flex-1 flex items-center">
          <div class="flex-1 border-r px-4 h-full border-r flex items-center">
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
            />
          </div>

          <div class="h-full px-6">
            <AppPagination
              :current-page="currentPage"
              :items-per-page="10"
              :total-items="125"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </AppTableHeader>

      <AppTransactionTable
        :transactions="transactions"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @suspend="suspendMerchant"
        @restore="restoreMerchant"
        @delete="deleteMerchant"
        @view="showDetails = true"
      />
    </AppTableContainer>

    <!-- 
    <app-details :details="paymentDetails" /> -->

    <AppModal
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
    </AppModal>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import {
    AppTransactionTable,
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

  const selectedFilterOption = ref("all_time")
  const activeTab = ref("recents")
  const showDetails = ref(false)

  const dropdownOptions = [
    { label: "All Time", value: "all_time" },
    { label: "Today", value: "daily" },
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ]

  const tabs = [
    { key: "recents", label: "Recents" },
    { key: "beneficiaries", label: "Beneficiaries" },
  ]

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

  // Sample merchant data
  const transactions = ref<Merchant[]>([
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
  const totalItems = ref(50) // Total number of transactions

  // Filter transactions based on search query
  const filteredMerchants = computed(() => {
    if (!searchQuery.value) return transactions.value

    const query = searchQuery.value.toLowerCase()
    return transactions.value.filter((merchant) =>
      merchant.name.toLowerCase().includes(query)
    )
  })

  //    const paymentDetails = [
  //   { title: "Deposit Amount", content: "11,233" },
  //   { title: "Fee", content: "1333" },
  // ]

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
    const merchant = transactions.value.find((m) => m.id === merchantId)
    if (merchant) {
      merchant.status = "suspended"
    }
  }

  const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
    console.log("Page changed to:", newPage)
  }

  const restoreMerchant = (merchantId: number) => {
    const merchant = transactions.value.find((m) => m.id === merchantId)
    if (merchant) {
      merchant.status = "active"
    }
  }

  const deleteMerchant = (merchantId: number) => {
    transactions.value = transactions.value.filter((m) => m.id !== merchantId)
  }
</script>
