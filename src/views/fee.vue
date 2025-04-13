<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Merchants</h2>
      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          class="pl-10 pr-4 py-2 border rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <SearchIcon />
        </div>
      </div>
    </div>

    <MerchantTable
      :merchants="filteredMerchants"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      @suspend="suspendMerchant"
      @restore="restoreMerchant"
      @delete="deleteMerchant"
    />

    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-500">
        {{ paginationText }}
      </div>
      <div class="flex space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="p-2 rounded-md border disabled:opacity-50"
          :class="
            currentPage === 1
              ? 'text-gray-300'
              : 'text-gray-700 hover:bg-gray-100'
          "
        >
          <!-- <ChevronLeftIcon /> -->
        </button>
        <button
          @click="nextPage"
          :disabled="isLastPage"
          class="p-2 rounded-md border disabled:opacity-50"
          :class="
            isLastPage ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'
          "
        >
          <!-- <ChevronRightIcon /> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import MerchantTable from "../components/MerchantTable.vue"
  // import SearchIcon from '../icons/SearchIcon.vue';
  // import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue';
  // import ChevronRightIcon from '../icons/ChevronRightIcon.vue';

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
  const filteredMerchants = computed(() => {
    if (!searchQuery.value) return merchants.value

    const query = searchQuery.value.toLowerCase()
    return merchants.value.filter((merchant) =>
      merchant.name.toLowerCase().includes(query)
    )
  })

  // Calculate whether we're on the last page
  const isLastPage = computed(() => {
    return currentPage.value * itemsPerPage.value >= totalItems.value
  })

  // Create pagination text (e.g., "1-10 of 50")
  const paginationText = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1
    const end = Math.min(
      currentPage.value * itemsPerPage.value,
      totalItems.value
    )
    return `${start}-${end} of ${totalItems.value}`
  })

  // Handle pagination
  const nextPage = () => {
    if (!isLastPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  // Methods for handling merchant actions
  const suspendMerchant = (merchantId: number) => {
    const merchant = merchants.value.find((m) => m.id === merchantId)
    if (merchant) {
      merchant.status = "suspended"
    }
  }

  const restoreMerchant = (merchantId: number) => {
    const merchant = merchants.value.find((m) => m.id === merchantId)
    if (merchant) {
      merchant.status = "active"
    }
  }

  const deleteMerchant = (merchantId: number) => {
    merchants.value = merchants.value.filter((m) => m.id !== merchantId)
  }
</script>
