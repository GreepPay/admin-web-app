<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header
        title="Merchants"
        right-side-class="flex-1"
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
            <app-pagination
              :pagination="MerchantProfilePaginator.paginatorInfo"
              @update:page="handlePageChange"
              :loading="isFetching"
            />
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
  import { defineComponent, ref, onMounted, computed } from "vue"
  import {
    AppMerchantTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

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
        () => MerchantProfilePaginator.value.data.length >= 1
      )

      // reactives
      const searchQuery = ref("")
      const isFetching = ref(false)
      const currentPageNumber = ref(1)
      const MerchantProfilePaginator = ref(Logic.User.MerchantProfilePaginator)

      // Methods for handling merchant actions
      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        handleFetch()
      }
      const handleFetch = async () => {
        isFetching.value = true
        await Logic.User.GetMerchantProfiles(
          itemsPerPage,
          currentPageNumber.value
        )
        isFetching.value = false
      }

      onMounted(() => {
        Logic.User.watchProperty(
          "MerchantProfilePaginator",
          MerchantProfilePaginator
        )
      })

      return {
        searchQuery,
        isFetching,
        itemsPerPage,
        MerchantProfilePaginator,
        showRightSide,
        handlePageChange,
      }
    },
  })
</script>
