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
              :current-page="currentPage"
              :items-per-page="10"
              :total-items="125"
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

      <pre>
            {{ CustomerProfilePaginator }}
      </pre>
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

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

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
          params: [],
          requireAuth: true,
        },
      ],
    },
    setup() {
      const merchants = ref<Merchant[]>([
        {
          id: 1,
          name: "Arlene McCoy",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          joinedDate: "03/11/2024",
          joinedTime: "19:06",
          status: "active",
        },
      ])

      const searchQuery = ref("")
      const currentPage = ref(1)
      const itemsPerPage = ref(10)
      const totalItems = ref(50) // Total number of merchants

      const CustomerProfilePaginator = ref(Logic.User.CustomerProfilePaginator)

      // Filter merchants based on search query
      const filteredCustomers = computed(() => {
        if (!searchQuery.value) return merchants.value

        const query = searchQuery.value.toLowerCase()
        return merchants.value.filter((merchant) =>
          merchant.name.toLowerCase().includes(query)
        )
      })

      // Methods for handling merchant actions
      const suspendCustomer = (merchantId: number) => {
        const merchant = merchants.value.find((m) => m.id === merchantId)
        if (merchant) {
          merchant.status = "suspended"
        }
      }

      const handlePageChange = (newPage: number) => {
        currentPage.value = newPage
      }

      const restoreCustomer = (merchantId: number) => {
        const merchant = merchants.value.find((m) => m.id === merchantId)
        if (merchant) {
          merchant.status = "active"
        }
      }

      const deleteCustomer = (merchantId: number) => {
        merchants.value = merchants.value.filter((m) => m.id !== merchantId)
      }

      onMounted(() => {
        // Logic.Auth.watchProperty(
        //   "CustomerProfilePaginator",
        //   CustomerProfilePaginator
        // )

        console.log("CustomerProfilePaginator", CustomerProfilePaginator)
      })
      return {
        searchQuery,
        currentPage,
        itemsPerPage,
        totalItems,
        filteredCustomers,
        CustomerProfilePaginator,
        suspendCustomer,
        handlePageChange,
        restoreCustomer,
        deleteCustomer,
      }
    },
  })
</script>
