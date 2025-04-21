<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header rightSideClass="flex-1">
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
          <div class="flex-1 border-r px-4 h-full flex items-center">
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

      <app-transaction-table
        :transactions="transactions"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @delete="freezeTransaction"
        @view="showDetails = true"
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
            <h1 class="text-2xl font-medium">$200.00</h1>
          </div>
        </app-image-card-container>

        <app-transaction-details
          :details="[{ title: 'Merchant', content: 'Timms Closet Ventures' }]"
        />
        <app-transaction-details :details="paymentDetails" />
      </div>
    </app-modal>
  </dashboard-layout>
</template>

<script lang="ts">
  import { ref, defineComponent } from "vue"
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

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

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
    setup() {
      const selectedFilterOption = ref("all_time")
      const activeTab = ref("recents")
      const showDetails = ref(false)

      const tabs = [
        { key: "all", label: "All" },
        { key: "merchants", label: "Merchants" },
        { key: "customers", label: "Customers" },
      ]

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
      const totalItems = ref(50)

      const paymentDetails = [
        { title: "Acc. Name", content: "Timmy Salami" },
        { title: "Acc. Number", content: "134342333" },
        { title: "Amount", content: "$ 200" },
        { title: "Fee", content: "$ 2" },
        { title: "Received", content: "$ 198" },
        { title: "FeAcc. Number", content: "Feb 20, 2025 " },
      ]

      const handlePageChange = (newPage: number) => {
        currentPage.value = newPage
      }

      const freezeTransaction = (merchantId: number) => {
        transactions.value = transactions.value.filter(
          (m) => m.id !== merchantId
        )
      }

      return {
        selectedFilterOption,
        activeTab,
        showDetails,
        tabs,
        transactions,
        searchQuery,
        currentPage,
        itemsPerPage,
        totalItems,
        paymentDetails,
        handlePageChange,
        freezeTransaction,
      }
    },
  })
</script>
