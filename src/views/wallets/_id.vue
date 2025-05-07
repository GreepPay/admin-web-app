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
            :pagination="WalletHistoryPaginator.paginatorInfo"
            @update:page="handlePageChange"
          />
        </div>
      </app-table-header>

      <app-wallet-history-table
        :users="WalletHistoryPaginator.data"
        @see-history="seeHistory"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue"
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
    middlewares: {
      fetchRules: [
        {
          domain: "Transaction",
          property: "WalletHistoryPaginator",
          method: "GetWalletHistory",
          params: [10, 1],
          requireAuth: true,
        },
      ],
    },
    setup() {
      // constants
      const itemsPerPage = 10

      // reactives
      const WalletHistoryPaginator = ref(
        Logic.Transaction.WalletHistoryPaginator
      )
      const searchQuery = ref("")
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

      // const filteredUsers = computed(() => {
      //   if (!searchQuery.value) return users.value
      //   const query = searchQuery.value.toLowerCase()
      //   return users.value.filter((user) =>
      //     user.name.toLowerCase().includes(query)
      //   )
      // })

      const seeHistory = (id: string) => {
        Logic.Common.GoToRoute(`/wallets/${id}`)
      }

      const freezeUser = (merchantId: string) => {
        users.value = users.value.filter((m) => m.id !== merchantId)
      }

      // Watch property
      onMounted(() => {
        Logic.User.watchProperty(
          "WalletHistoryPaginator",
          WalletHistoryPaginator
        )
      })

      return {
        Logic,
        users,
        searchQuery,
        itemsPerPage,
        showDetails,
        WalletHistoryPaginator,
        seeHistory,
        freezeUser,
      }
    },
  })
</script>
