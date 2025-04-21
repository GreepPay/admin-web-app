<template>
  <dashboard-layout>
    <app-table-container>
      <app-table-header title="Admin Users" right-side-class="flex-1">
        <div class="flex-1 flex items-center h-full">
          <div class="flex-1 px-4 h-full border-r flex items-center">
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

      <app-table-header title-class="!py-0 flex-1" right-side-class="!p-0">
        <template #title>
          <div class="flex-1 h-full">
            <app-text-field
              type="email"
              placeholder="Enter email"
              ref="email"
              name="Email"
              v-model="formData.email"
              :show-validation-message="false"
              custom-class="border-none !text-green"
              input-style="!font-normal"
            />
          </div>
        </template>

        <div class="flex-1 flex items-center h-full">
          <div class="h-full">
            <app-dropdown
              v-model="selectedRole"
              :options="roleOptions"
              placeholder="Assign role"
            />
          </div>

          <div class="h-full">
            <app-button
              variant="primary"
              custom-class="w-full !py-4.5 !bg-black !rounded-none"
            >
              Make Admin
            </app-button>
          </div>
        </div>
      </app-table-header>

      <app-admin-table
        :admins="admins"
        @change-role="changeRole"
        @remove="deleteCustomer"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from "vue"
  import {
    AppAdminTable,
    AppTableHeader,
    AppTableContainer,
    AppPagination,
    AppSearch,
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

  export default defineComponent({
    name: "AdminUsersPage",
    components: {
      AppAdminTable,
      AppTableHeader,
      AppTableContainer,
      AppPagination,
      AppSearch,
      AppTextField,
      AppButton,
      AppDropdown,
    },
    setup() {
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
      const totalItems = ref(50) // Total number of admins
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
      const handlePageChange = (newPage: number) => {
        currentPage.value = newPage
      }

      return {
        admins,
        searchQuery,
        currentPage,
        formData,
        selectedRole,
        roleOptions,
        changeRole,
        handlePageChange,
      }
    },
  })
</script>
