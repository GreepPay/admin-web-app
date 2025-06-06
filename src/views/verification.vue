<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header
        title="Verify Merchants"
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
              :pagination="VerificationPaginator.paginatorInfo"
              @update:page="handlePageChange"
              :loading="isFetching"
            />
          </div>
        </div>
      </app-table-header>

      <app-verification-table :verifications="VerificationPaginator.data" />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from "vue"
  import {
    AppVerificationTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

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
          ignoreProperty: true,
        },
      ],
    },

    setup() {
      // constants
      const itemsPerPage = 10

      // computed
      const showRightSide = computed(
        () => VerificationPaginator.value?.data?.length >= 1
      )

      // reactives
      const searchQuery = ref("")
      const isFetching = ref(false)
      const currentPageNumber = ref(1)
      const VerificationPaginator = ref(
        Logic.Verification.VerificationPaginator
      )

      // Methods for handling merchant actions
      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        handleFetch()
      }
      const handleFetch = async () => {
        isFetching.value = true
        await Logic.Verification.GetVerificationRequests(
          itemsPerPage,
          currentPageNumber.value
        )
        isFetching.value = false
      }

      onMounted(() => {
        Logic.Verification.watchProperty(
          "VerificationPaginator",
          VerificationPaginator
        )
      })

      return {
        searchQuery,
        itemsPerPage,
        isFetching,
        VerificationPaginator,
        showRightSide,
        handlePageChange,
      }
    },
  })
</script>
