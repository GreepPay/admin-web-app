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
              :pagination="AdminProfilePaginator.paginatorInfo"
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
              v-model="email"
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
              @click="makeNewAdmin"
            >
              Make Admin
            </app-button>
          </div>
        </div>
      </app-table-header>

      <app-admin-table
        :admins="AdminProfilePaginator.data"
        @change-role="changeAdminRole"
        @remove="removeAdmin"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue"
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

    middlewares: {
      fetchRules: [
        {
          domain: "User",
          property: "AdminProfilePaginator",
          method: "GetAdminProfiles",
          params: [10, 1],
          requireAuth: true,
        },
      ],
    },
    setup() {
      // constants
      const itemsPerPage = 10
      const roleOptions = [
        { label: "Super Admin", value: "super-admin" },
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
        { label: "User", value: "user" },
      ]

      // reactives
      const searchQuery = ref("")
      const selectedRole = ref(null)
      const email = ref("")
      const AdminProfilePaginator = ref(Logic.User.AdminProfilePaginator)

      // Methods for handling merchant actions
      const makeNewAdmin = () => {
        console.log("make neww admin")
      }

      const handlePageChange = (newPage: number) => {
        Logic.User.GetAdminProfiles(itemsPerPage, newPage)
      }

      const changeAdminRole = (user: any) => {
        console.log("merchantId", user)
      }

      const removeAdmin = (user: any) => {
        console.log("merchantId", user)
      }

      // Watch property
      onMounted(() => {
        Logic.User.watchProperty("AdminProfilePaginator", AdminProfilePaginator)
      })

      return {
        searchQuery,
        email,
        selectedRole,
        roleOptions,
        AdminProfilePaginator,
        makeNewAdmin,
        removeAdmin,
        changeAdminRole,
        handlePageChange,
      }
    },
  })
</script>
