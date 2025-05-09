<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header rightSideClass="flex-1" :showRightSide="showRightSide">
        <template #title>
          <div class="flex items-center space-x-4">
            <h2
              class="text-lg flex items-center justify-center px-2 font-medium h-full"
            >
              Transactions
            </h2>
            <!-- <app-tabs :tabs="tabs" v-model:activeTab="activeTab" /> -->
          </div>
        </template>

        <div class="flex-1 flex items-center">
          <div class="flex-1 border-r px-4 h-full flex items-center">
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
              @search="handleSearch(true)"
              @clear-search="handleClearSearch"
            />
          </div>

          <div class="h-full px-6">
            <app-pagination
              :pagination="TransactionsPaginator.paginatorInfo"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </app-table-header>

      <app-transaction-table
        :transactions="TransactionsPaginator.data"
        @view="handleView"
      />
    </app-table-container>

    <app-modal
      :isOpen="showDetails"
      title="Merchant Withdrawal"
      :showTitle="true"
      :showFooter="false"
      @close="showDetails = false"
    >
      <div class="space-y-5">
        <app-image-card-container>
          <div class="text-white text-center space-y-1">
            <p class="text-sm">Amount</p>
            <h1 class="text-2xl font-medium">
              {{
                `${selectedTransaction?.amount} ${selectedTransaction?.currency}`
              }}
            </h1>
          </div>
        </app-image-card-container>

        <app-transaction-details
          :details="[
            {
              title: `${selectedTransaction?.user?.role?.name}`,
              content: `${selectedTransaction.user?.first_name} ${selectedTransaction.user?.last_name}`,
            },
          ]"
        />
        <app-transaction-details
          :details="mapTransactionToPaymentDetails(selectedTransaction)"
        />
      </div>
    </app-modal>
  </dashboard-layout>
</template>

<script lang="ts">
  import { ref, defineComponent, onMounted, computed } from "vue"
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
    AppImageCardContainer,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { Transaction } from "@greep/logic/src/gql/graphql"
  import { mapTransactionToPaymentDetails } from "../utils/constants"

  export default defineComponent({
    name: "AppTransactionPage",
    components: {
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
      AppImageCardContainer,
    },
    middlewares: {
      fetchRules: [
        {
          domain: "Transaction",
          property: "TransactionsPaginator",
          method: "GetTransactions",
          params: [10, 1],
          requireAuth: true,
          ignoreProperty: true,
        },
      ],
    },
    setup() {
      //
      const itemsPerPage = 10
      const tabs = [
        { key: "all", label: "All" },
        { key: "merchants", label: "Merchants" },
        { key: "customers", label: "Customers" },
      ]

      // computed
      const showRightSide = computed(
        () => TransactionsPaginator.value.data.length >= 1
      )

      //
      const TransactionsPaginator = ref(Logic.Transaction.TransactionsPaginator)
      const activeTab = ref("recents")
      const showDetails = ref(false)
      const selectedTransaction = ref<Transaction | null>(null)

      const searchQuery = ref("")
      const currentPageNumber = ref(1)

      const handleView = (transaction: Transaction) => {
        selectedTransaction.value = transaction
        showDetails.value = true
      }

      const handleClearSearch = () => handleSearch(true)
      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        handleSearch(false)
      }
      const handleSearch = (newSearch: Boolean) => {
        const currentPage = !newSearch ? currentPageNumber.value : 1
        Logic.Transaction.GetTransactions(
          itemsPerPage,
          currentPage,
          searchQuery.value
        )
      }

      // Watch property
      onMounted(() => {
        Logic.Transaction.watchProperty(
          "TransactionsPaginator",
          TransactionsPaginator
        )
      })

      return {
        activeTab,
        showDetails,
        tabs,
        searchQuery,
        TransactionsPaginator,
        selectedTransaction,
        showRightSide,
        handlePageChange,
        handleView,
        mapTransactionToPaymentDetails,
        handleSearch,
        handleClearSearch,
      }
    },
  })
</script>
