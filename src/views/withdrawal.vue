<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader title="Withdrawals" rightSideClass="flex-1">
        <div class="w-full flex items-center h-full">
          <div
            class="flex-1 w-full border-r px-4 h-full border-r flex items-center"
          >
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

      <AppWithdrawalTable
        :withdrawals="withdrawals"
        @suspend="suspendMerchant"
        @restore="restoreMerchant"
        @delete="deleteMerchant"
      />
    </AppTableContainer>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import {
    AppWithdrawalTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"

  interface Withdrawal {
    id: number
    name: string
    avatar: string
    amount: string
    status: "active" | "suspended"
  }
  const withdrawals: Withdrawal[] = [
    {
      id: 1,
      name: "Arlene McCoy",
      avatar: "https://i.pravatar.cc/100?img=1",
      amount: "$300",
      status: "active",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://i.pravatar.cc/100?img=2",
      amount: "$300",
      status: "suspended",
    },
    {
      id: 3,
      name: "Ralph Edwards",
      avatar: "https://i.pravatar.cc/100?img=3",
      amount: "$300",
      status: "active",
    },
    {
      id: 4,
      name: "Jerome Bell",
      avatar: "https://i.pravatar.cc/100?img=4",
      amount: "$300",
      status: "suspended",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      avatar: "https://i.pravatar.cc/100?img=5",
      amount: "$300",
      status: "active",
    },
  ]
  const searchQuery = ref("")
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(50)

  const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
  }
  // Filter withdrawals based on search query
  // const filteredWithdrawals = computed(() => {
  //   if (!searchQuery.value) return withdrawals.value

  //   const query = searchQuery.value.toLowerCase()
  //   return withdrawals.value.filter((merchant) =>
  //     merchant.name.toLowerCase().includes(query)
  //   )
  // })

  // // Methods for handling merchant actions
  // const suspendMerchant = (merchantId: number) => {
  //   const merchant = withdrawals.value.find((m) => m.id === merchantId)
  //   if (merchant) {
  //     merchant.status = "suspended"
  //   }
  // }

  // const restoreMerchant = (merchantId: number) => {
  //   const merchant = withdrawals.value.find((m) => m.id === merchantId)
  //   if (merchant) {
  //     merchant.status = "active"
  //   }
  // }

  // const deleteMerchant = (merchantId: number) => {
  //   withdrawals.value = withdrawals.value.filter((m) => m.id !== merchantId)
  // }
</script>
