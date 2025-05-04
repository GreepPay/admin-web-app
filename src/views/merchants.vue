<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header title="Merchants" right-side-class="flex-1">
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
            <app-pagination @update:page="handlePageChange" />
          </div>
        </div>
      </app-table-header>

      <app-merchant-table
        :merchants="MerchantProfilePaginator.data"
        @suspend="suspendMerchant"
        @restore="restoreMerchant"
        @delete="deleteMerchant"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from "vue"
  import {
    AppMerchantTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { PaginatorInfo } from "@greep/logic/src/gql/graphql"

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

  export default defineComponent({
    components: {
      AppMerchantTable,
      AppTableHeader,
      AppTableContainer,
      AppPagination,
      AppSearch,
    },
    middlewares: {
      fetchRules: [
        {
          domain: "User",
          property: "MerchantProfilePaginator",
          method: "GetMerchantProfiles",
          params: [],
          requireAuth: true,
        },
      ],
    },

    setup() {
      const searchQuery = ref("")
      const currentPage = ref(1)
      const itemsPerPage = ref(10)
      const totalItems = ref(50)

      const MerchantProfilePaginator = ref(Logic.User.MerchantProfilePaginator)
      const merchantsPagination = ref<PaginatorInfo>()
      const merchants = ref<PaginatorInfo>()

      // const merchants = ref<Merchant[]>([
      //   {
      //     id: 1,
      //     name: "Arlene McCoy",
      //     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      //     joinedDate: "03/11/2024",
      //     joinedTime: "19:06",
      //     status: "active",
      //   },
      // ])

      // const filteredMerchants = computed(() => {
      //   if (!searchQuery.value) return merchants.value

      //   const query = searchQuery.value.toLowerCase()
      //   return merchants.value.filter((merchant) =>
      //     merchant.name.toLowerCase().includes(query)
      //   )
      // })

      // const suspendMerchant = (merchantId: number) => {
      //   const merchant = merchants.value.find((m) => m.id === merchantId)
      //   if (merchant) {
      //     merchant.status = "suspended"
      //   }
      // }

      // const restoreMerchant = (merchantId: number) => {
      //   const merchant = merchants.value.find((m) => m.id === merchantId)
      //   if (merchant) {
      //     merchant.status = "active"
      //   }
      // }

      // const deleteMerchant = (merchantId: number) => {
      //   merchants.value = merchants.value.filter((m) => m.id !== merchantId)
      // }

      // const handlePageChange = (newPage: number) => {
      //   currentPage.value = newPage
      // }

      return {
        merchants,
        searchQuery,
        currentPage,
        itemsPerPage,
        totalItems,
        // filteredMerchants,
        MerchantProfilePaginator,
        // suspendMerchant,
        // restoreMerchant,
        // deleteMerchant,
        // handlePageChange,
        merchantsPagination,
      }
    },
  })
</script>
