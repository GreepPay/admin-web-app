<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader title="Customers" rightSideClass="flex-1">
        <div class="flex-1 flex items-center h-full">
          <div class="flex-1 border-r px-4 h-full border-r flex items-center">
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

      <AppCustomerTable
        :customers="filteredCustomers"
        @suspend="suspendCustomer"
        @restore="restoreCustomer"
        @delete="deleteCustomer"
      />
    </AppTableContainer>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import {
    AppCustomerTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
  } from "@greep/ui-components"

  interface Merchant {
    id: number
    name: string
    avatar: string
    joinedDate: string
    joinedTime: string
    status: "active" | "suspended"
  }

  // Sample merchant data
  const merchants = ref<Merchant[]>([
    {
      id: 1,
      name: "Arlene McCoy",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "suspended",
    },
    {
      id: 3,
      name: "Ralph Edwards",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 4,
      name: "Jerome Bell",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "suspended",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "suspended",
    },
    {
      id: 6,
      name: "Sadie Thomas",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 7,
      name: "Cameron Williamson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 8,
      name: "Kristin Watson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 9,
      name: "Mcrory Adams",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
      status: "active",
    },
    {
      id: 10,
      name: "Stalline Dre",
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
</script>
