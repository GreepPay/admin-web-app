<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header
        right-side-class="flex-1"
        :showRightSide="showRightSide"
      >
        <template #title>
          <div class="flex items-center space-x-4">
            <h2
              class="text-lg flex items-center justify-center px-2 font-medium h-full"
            >
              Wallets
            </h2>
            <!-- <app-tabs :tabs="tabs" v-model:active-tab="activeTab" /> -->
          </div>
        </template>

        <div class="flex-1 flex items-center">
          <div class="flex-1 border-r px-4 h-full border-r flex items-center">
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
            />

            <!-- @search="handleSearch"
              @clear-search="handleClearSearch" -->
          </div>

          <div class="h-full px-6">
            <app-pagination
              :pagination="WalletPaginator.paginatorInfo"
              @update:page="handlePageChange"
              :loading="isFetching"
            />
          </div>
        </div>
      </app-table-header>

      <app-wallet-table
        :wallets="WalletPaginator.data"
        @see-history="seeHistory"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue"
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
          property: "WalletPaginator",
          method: "GetWallets",
          params: [10, 1],
          requireAuth: true,
          ignoreProperty: true,
        },
      ],
    },

    setup() {
      // constants
      const itemsPerPage = 10
      const tabs = [
        { key: "all", label: "All" },
        { key: "users", label: "Merchants" },
        { key: "customers", label: "Customers" },
      ]

      // computed
      const showRightSide = computed(
        () => WalletPaginator.value.data.length >= 1
      )

      //
      const WalletPaginator = ref(Logic.Wallet.WalletPaginator)
      const searchQuery = ref("")
      const isFetching = ref(false)
      const currentPageNumber = ref(1)
      const selectedFilterOption = ref("all_time")
      const activeTab = ref("all")
      const showDetails = ref(false)

      const seeHistory = (wallet: any) => {
        Logic.Common.GoToRoute(`/wallets/${wallet.id}`)
      }

      // const handlePageChange = (newPage: number) => {
      //   Logic.Wallet.GetWallets(itemsPerPage, newPage)
      // }
      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        handleFetch()
      }
      const handleFetch = async () => {
        isFetching.value = true
        await Logic.Wallet.GetWallets(itemsPerPage, currentPageNumber.value)
        isFetching.value = false
      }

      // const handleSearch = (searchQuery: string) => {
      //   Logic.Transaction.GetTransactions(itemsPerPage, 1, searchQuery)
      // }
      // const handleClearSearch = () => {
      //   Logic.Transaction.GetTransactions(itemsPerPage, 1, "")
      // }

      // Watch property
      onMounted(() => {
        Logic.Wallet.watchProperty("WalletPaginator", WalletPaginator)
      })

      return {
        searchQuery,
        isFetching,
        showRightSide,
        activeTab,
        selectedFilterOption,
        tabs,
        showDetails,
        WalletPaginator,
        seeHistory,
        handlePageChange,
        // handleSearch,
        // handleClearSearch,
      }
    },
  })
</script>
