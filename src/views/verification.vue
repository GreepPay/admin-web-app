<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader title="Verify Merchants" rightSideClass="flex-1">
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
              :current-page="currentPage"
              :items-per-page="10"
              :total-items="125"
              @update:page="handlePageChange"
            />
          </div>
        </div>
      </AppTableHeader>

      <AppVerificationTable :verifications="verifications" />
    </AppTableContainer>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import {
    AppVerificationTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"

  interface Withdrawal {
    id: number
    name: string
    avatar: string
    status: "active" | "suspended"
  }
  const verifications: Withdrawal[] = [
    {
      id: 1,
      name: "Arlene McCoy",
      avatar: "https://i.pravatar.cc/100?img=1",
      status: "active",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://i.pravatar.cc/100?img=2",
      status: "suspended",
    },
    {
      id: 3,
      name: "Ralph Edwards",
      avatar: "https://i.pravatar.cc/100?img=3",
      status: "active",
    },
    {
      id: 4,
      name: "Jerome Bell",
      avatar: "https://i.pravatar.cc/100?img=4",
      status: "suspended",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      avatar: "https://i.pravatar.cc/100?img=5",
      status: "active",
    },
  ]
  const searchQuery = ref("")
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(50)

  const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
  }
</script>
