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
              :pagination="WithdrawalsPaginator.paginatorInfo"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </AppTableHeader>

      <AppWithdrawalTable :withdrawals="WithdrawalsPaginator.data" />
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
        },
      ],
    },
    setup() {
      // constants
      const itemsPerPage = 10

      const searchQuery = ref("")
      const WithdrawalsPaginator = ref(Logic.Transaction.WithdrawalsPaginator)

      // computed
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
        Logic.Transaction.GetWithdrawals(itemsPerPage, newPage)
      }

      const suspendCustomer = (merchantId: number) => {
        console.log("merchantId", merchantId)
      }

      const restoreCustomer = (merchantId: string) => {
        console.log("merchantId", merchantId)
      }

      const deleteCustomer = (merchantId: string) => {
        console.log("merchantId", merchantId)
      }

      // Watch property
      onMounted(() => {
        Logic.User.watchProperty("WithdrawalsPaginator", WithdrawalsPaginator)
      })

      return {
        searchQuery,
        filteredCustomers,
        WithdrawalsPaginator,
        suspendCustomer,
        handlePageChange,
        restoreCustomer,
        deleteCustomer,
      }
    },
  })
</script>
