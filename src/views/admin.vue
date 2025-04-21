<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader title="Admin Users" rightSideClass="flex-1">
        <div class="flex-1 flex items-center h-full">
          <div class="flex-1 px-4 h-full border-r flex items-center">
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

      <AppTableHeader titleClass="!py-0 flex-1" rightSideClass="!p-0">
        <template #title>
          <div class="flex-1 h-full">
            <app-text-field
              type="email"
              placeholder="Enter email"
              ref="email"
              name="Email"
              v-model="formData.email"
              :show-validation-message="false"
              customClass="border-none !text-green"
              inputStyle="!font-normal"
            >
            </app-text-field>
          </div>
        </template>

        <div class="flex-1 flex items-center h-full">
          <div class="h-full">
            <AppDropdown
              v-model="selectedRole"
              :options="roleOptions"
              placeholder="Assign role"
            />
          </div>

          <div class="h-full">
            <AppButton
              variant="primary"
              customClass="w-full !py-4.5 !bg-black !rounded-none"
            >
              Make Admin
            </AppButton>
          </div>
        </div>
      </AppTableHeader>

      <!-- <AppCustomerTable
        :customers="filteredCustomers"
        @suspend="suspendCustomer"
        @restore="restoreCustomer"
        @delete="deleteCustomer"
      /> -->

      <!-- <AppPdfViewer fileUrl="/test-pdf.pdf" /> -->
    </AppTableContainer>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, reactive } from "vue"
  import {
    AppCustomerTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
    AppPdfViewer,
    AppTextField,
    AppButton,
    AppDropdown,
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

  const FormValidations = Logic.Form
  const formComponent = ref<any>(null)
  const searchQuery = ref("")
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(50) // Total number of merchants
  const formData = reactive({
    email: "",
  })

  const selectedRole = ref(null)

  const roleOptions = [
    { label: "Super Admin", value: "super-admin" },
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "User", value: "user" },
  ]

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
