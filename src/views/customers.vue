<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header title="Customers" right-side-class="flex-1">
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

      <app-customer-table
        :customers="CustomerProfilePaginator.data"
        @suspend="suspendCustomer"
        @restore="restoreCustomer"
        @delete="deleteCustomer"
      />
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

      // reactives
      const searchQuery = ref("")
      const CustomerProfilePaginator = ref(Logic.User.CustomerProfilePaginator)

      // computed
      // const filteredCustomers = computed(() => {
      //   const query = searchQuery.value.trim().toLowerCase()
      //   if (!query) return CustomerProfilePaginator.value.data

      //   return CustomerProfilePaginator.value.data.filter((profile) => {
      //     const { first_name, last_name } = profile.user
      //     const fullName = `${first_name} ${last_name}`.toLowerCase()

      //     return (
      //       first_name.toLowerCase().includes(query) ||
      //       last_name.toLowerCase().includes(query) ||
      //       fullName.includes(query)
      //     )
      //   })
      // })

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
        // filteredCustomers,
        CustomerProfilePaginator,
        suspendCustomer,
        handlePageChange,
        restoreCustomer,
        deleteCustomer,
      }
    },
  })
</script>
