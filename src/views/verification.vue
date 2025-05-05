<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header title="Verify Merchants" right-side-class="flex-1">
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
            <app-pagination
              :pagination="VerificationPaginator.paginatorInfo"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </app-table-header>

      <app-verification-table :verifications="VerificationPaginator.data" />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue"
  import {
    AppVerificationTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  interface Withdrawal {
    id: number
    name: string
    avatar: string
    status: "active" | "suspended"
  }

  export default defineComponent({
    components: {
      AppVerificationTable,
      AppTableHeader,
      AppTableContainer,
      AppPagination,
      AppSearch,
    },
    middlewares: {
      fetchRules: [
        {
          domain: "Verification",
          property: "VerificationPaginator",
          method: "GetVerificationRequests",
          params: [10, 1],
          requireAuth: true,
        },
      ],
    },

    setup() {
      // constants
      const itemsPerPage = 10

      // reactives
      const searchQuery = ref("")
      const currentPage = ref(1)
      const totalItems = ref(50)
      const VerificationPaginator = ref(
        Logic.Verification.VerificationPaginator
      )

      // Methods for handling merchant actions
      const handlePageChange = (newPage: number) => {
        Logic.Verification.GetVerificationRequests(itemsPerPage, newPage)
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

      onMounted(() => {
        Logic.User.watchProperty("VerificationPaginator", VerificationPaginator)
      })

      return {
        searchQuery,
        currentPage,
        itemsPerPage,
        totalItems,
        VerificationPaginator,
        handlePageChange,
        deleteCustomer,
        restoreCustomer,
        suspendCustomer,
      }
    },
  })
</script>
