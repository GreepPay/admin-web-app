<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader
        title="Withdrawals"
        rightSideClass="flex-1"
        :showRightSide="showRightSide"
      >
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
              :pagination="WithdrawalsPaginator.paginatorInfo"
              @update:page="handlePageChange"
              :loading="isFetching"
            />
          </div>
        </div>
      </AppTableHeader>

      <AppWithdrawalTable :transactions="WithdrawalsPaginator.data" />
    </AppTableContainer>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue"
  import {
    AppWithdrawalTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WithdrawalsPage",
    components: {
      AppWithdrawalTable,
      AppTableHeader,
      AppTableContainer,
      AppPagination,
      AppSearch,
    },

    middlewares: {
      fetchRules: [
        {
          domain: "Transaction",
          property: "WithdrawalsPaginator",
          method: "GetWithdrawals",
          params: [10, 1],
          requireAuth: true,
          ignoreProperty: true,
        },
      ],
    },
    setup() {
      // constants
      const itemsPerPage = 10

      const isFetching = ref(false)
      const currentPageNumber = ref(1)
      const searchQuery = ref("")
      const WithdrawalsPaginator = ref(Logic.Transaction.WithdrawalsPaginator)

      // computed
      const showRightSide = computed(
        () => WithdrawalsPaginator.value.data.length >= 1
      )
      const filteredCustomers = computed(() => {
        const query = searchQuery.value.trim().toLowerCase()
        if (!query) return WithdrawalsPaginator.value.data

        return WithdrawalsPaginator.value.data.filter((profile) => {
          const { first_name, last_name } = profile.user
          const fullName = `${first_name} ${last_name}`.toLowerCase()

          return (
            first_name.toLowerCase().includes(query) ||
            last_name.toLowerCase().includes(query) ||
            fullName.includes(query)
          )
        })
      })

      // Methods for handling merchant actions
      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        handleFetch()
      }
      const handleFetch = async () => {
        isFetching.value = true
        await Logic.Transaction.GetWithdrawals(
          itemsPerPage,
          currentPageNumber.value
        )
        isFetching.value = false
      }

      // Watch property
      onMounted(() => {
        Logic.Transaction.watchProperty(
          "WithdrawalsPaginator",
          WithdrawalsPaginator
        )
      })

      return {
        isFetching,
        searchQuery,
        filteredCustomers,
        WithdrawalsPaginator,
        showRightSide,
        handlePageChange,
      }
    },
  })
</script>
