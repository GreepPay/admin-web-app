<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header title-class="flex-1">
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

        <!-- <div class="flex-1 flex items-center h-full">
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
        </div> -->
      </app-table-header>

      <app-table-header title-class="flex-1 !py-0 !px-0">
        <template #title>
          <div class="w-full">
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
            />
          </div>
        </template>

        <div class="h-full px-6" v-if="showRightSide">
          <app-pagination
            :pagination="WalletHistoryPaginator.paginatorInfo"
            @update:page="handlePageChange"
            :loading="isFetching"
          />
        </div>
      </app-table-header>

      <app-wallet-history-table :transactions="WalletHistoryPaginator.data" />
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
  import { useRoute } from "vue-router"

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
          ignoreProperty: true,
          useRouteId: true,
        },
      ],
    },
    setup() {
      // constants
      const itemsPerPage = 10
      const wallet_id = useRoute().params.id as string

      // computed
      const showRightSide = computed(
        () => WalletHistoryPaginator.value.data.length >= 1
      )

      // reactives
      const WalletHistoryPaginator = ref(
        Logic.Transaction.WalletHistoryPaginator
      )
      const searchQuery = ref("")
      const isFetching = ref(false)
      const currentPageNumber = ref(1)

      // Methods for handling merchant actions
      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        handleFetch()
      }
      const handleFetch = async () => {
        isFetching.value = true
        await Logic.Transaction.GetWalletHistory(
          wallet_id,
          itemsPerPage,
          currentPageNumber.value
        )
        isFetching.value = false
      }

      // Watch property
      onMounted(() => {
        Logic.Transaction.watchProperty(
          "WalletHistoryPaginator",
          WalletHistoryPaginator
        )
      })

      return {
        Logic,
        searchQuery,
        itemsPerPage,
        WalletHistoryPaginator,
        showRightSide,
        isFetching,
        handlePageChange,
      }
    },
  })
</script>
