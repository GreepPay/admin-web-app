<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header
        title="Customers"
        right-side-class="flex-1"
        :showRightSide="showRightSide"
      >
        <div class="flex-1 flex items-center h-full">
          <div class="flex-1 border-r px-4 h-full border-r flex items-center">
            <app-search
              placeholder="Search..."
              @update:search="searchQuery = $event"
            />
          </div>

          <div class="h-full px-6">
            <app-pagination
              :pagination="CustomerProfilePaginator.paginatorInfo"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </app-table-header>

      <app-customer-table :customers="CustomerProfilePaginator.data" />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue"
  import {
    AppCustomerTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "CustomersPage",
    components: {
      AppCustomerTable,
      AppTableHeader,
      AppTableContainer,
      AppPagination,
      AppSearch,
    },

    middlewares: {
      fetchRules: [
        {
          domain: "User",
          property: "CustomerProfilePaginator",
          method: "GetCustomerProfiles",
          params: [10, 1],
          requireAuth: true,
        },
      ],
    },
    setup() {
      // constants
      const itemsPerPage = 10

      // computed
      const showRightSide = computed(
        () => CustomerProfilePaginator.value.data.length >= 1
      )

      // reactives
      const searchQuery = ref("")
      const CustomerProfilePaginator = ref(Logic.User.CustomerProfilePaginator)

      // Methods for handling merchant actions
      const handlePageChange = (newPage: number) => {
        Logic.User.GetCustomerProfiles(itemsPerPage, newPage)
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
        Logic.User.watchProperty(
          "CustomerProfilePaginator",
          CustomerProfilePaginator
        )
      })
      return {
        searchQuery,
        CustomerProfilePaginator,
        showRightSide,
        suspendCustomer,
        handlePageChange,
        restoreCustomer,
        deleteCustomer,
      }
    },
  })
</script>
