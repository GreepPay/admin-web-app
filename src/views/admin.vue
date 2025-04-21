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

      <AppAdminTable
        :admins="admins"
        @change-role="changeRole"
        @remove="deleteCustomer"
      />

      <!-- <AppPdfViewer fileUrl="/test-pdf.pdf" /> -->
    </AppTableContainer>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, reactive } from "vue"
  import {
    AppAdminTable,
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

  type AdminRole = "super-admin" | "admin" | "moderator" | "user" | null

  interface Admin {
    id: number
    name: string
    avatar: string
    role: AdminRole
    joinedDate: string
    joinedTime: string
  }

  // Sample merchant data
  const admins = ref<Admin[]>([
    {
      id: 1,
      name: "Ralph Edwards",
      avatar: "https://i.pravatar.cc/100?img=1",
      role: "super-admin",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://i.pravatar.cc/100?img=2",
      role: "admin",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
    },
    {
      id: 3,
      name: "Arlene McCoy",
      avatar: "https://i.pravatar.cc/100?img=3",
      role: "moderator",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
    },
    {
      id: 332,
      name: "Arlene McCoy",
      avatar: "https://i.pravatar.cc/100?img=8",
      role: "user",
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
    },
    {
      id: 23,
      name: "Arlene McCoy",
      avatar: "https://i.pravatar.cc/100?img=6",
      role: null,
      joinedDate: "03/11/2024",
      joinedTime: "19:06",
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

  const changeRole = (user: Admin) => {
    console.log(user)
  }
</script>
