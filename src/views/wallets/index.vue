<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header right-side-class="flex-1">
        <template #title>
          <div class="flex items-center space-x-4">
            <h2
              class="text-lg flex items-center justify-center px-2 font-medium h-full"
            >
              Wallets
            </h2>
            <app-tabs :tabs="tabs" v-model:active-tab="activeTab" />
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
            <app-pagination
              :current-page="currentPage"
              :items-per-page="10"
              :total-items="125"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </app-table-header>

      <app-wallet-table
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
    AppWalletTable,
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
      AppWalletTable,
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
    middlewares: {
      fetchRules: [
        {
          domain: "Wallet",
          property: "AllWalletPaginator",
          method: "GetWallets",
          params: [],
          requireAuth: true,
        },
      ],
    },

    setup() {
      const AllWalletPaginator = ref(Logic.Wallet.AllWalletPaginator)
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
        Logic.Common.GoToRoute(`/wallets/history`)
      }

      const handlePageChange = (newPage: number) => {
        currentPage.value = newPage
      }

      const freezeUser = (merchantId: string) => {
        users.value = users.value.filter((m) => m.id !== merchantId)
      }

      return {
        users,
        searchQuery,
        currentPage,
        itemsPerPage,
        totalItems,
        filteredUsers,
        activeTab,
        selectedFilterOption,
        dropdownOptions,
        tabs,
        showDetails,
        seeHistory,
        handlePageChange,
        freezeUser,
        AllWalletPaginator,
      }
    },
  })
</script>
