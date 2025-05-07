<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header right-side-class="flex-1" title-class="flex-1">
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
            <p class="font-normal text-black">Wallet Balance</p>
            <p class="font-bold text-black">$2,000.00</p>
          </div>
        </div>
      </app-table-header>

      <app-table-header title-class="flex-1 !py-0 !px-0">
        <template #title>
          <div>
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
            />
          </div>
        </template>

        <div class="h-full px-6">
          <app-pagination
            :current-page="currentPage"
            :items-per-page="10"
            :total-items="125"
            @update:page="handlePageChange"
          />
        </div>
      </app-table-header>

      <app-wallet-history-table
        :users="filteredUsers"
        @see-history="seeHistory"
        @freeze="freezeUser"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from "vue"
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

  type UserType = "Merchant" | "Customer"

  interface WalletUser {
    id: string
    name: string
    type: UserType
    avatar?: string
    balance: number
  }

  export default defineComponent({
    components: {
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
    },
    setup() {
      const selectedFilterOption = ref("all_time")
      const activeTab = ref("all")
      const showDetails = ref(false)

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
      const totalItems = ref(50)

      const filteredUsers = computed(() => {
        if (!searchQuery.value) return users.value
        const query = searchQuery.value.toLowerCase()
        return users.value.filter((user) =>
          user.name.toLowerCase().includes(query)
        )
      })

      const seeHistory = (id: string) => {
        console.log(id)
        // Logic.Common.GoToRoute(`/wallets/${id}`);
      }

      const handlePageChange = (newPage: number) => {
        currentPage.value = newPage
      }

      const freezeUser = (merchantId: string) => {
        users.value = users.value.filter((m) => m.id !== merchantId)
      }

      return {
        Logic,
        users,
        searchQuery,
        currentPage,
        itemsPerPage,
        totalItems,
        filteredUsers,
        activeTab,
        selectedFilterOption,
        showDetails,
        seeHistory,
        handlePageChange,
        freezeUser,
      }
    },
  })
</script>
