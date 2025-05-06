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

      <!-- only for super admins -->
      <template v-if="AuthUser && AuthUser?.role?.name === 'SuperAdmin'">
        <app-table-header title-class="!py-0 flex-1" right-side-class="!p-0">
          <template #title>
            <div class="flex-1 h-full">
              <app-form-wrapper
                ref="formComponent"
                :parent-refs="parentRefs"
                class="w-full flex flex-col space-y-[20px] h-full"
              >
                <app-text-field
                  type="email"
                  placeholder="Enter email"
                  ref="email"
                  name="Email"
                  v-model="formData.email"
                  custom-class="border-none !text-green"
                  :rules="[
                    FormValidations.RequiredRule,
                    FormValidations.EmailRule,
                  ]"
                  :show-validation-message="false"
                  input-style="!font-normal"
                />
              </app-form-wrapper>
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
                :disabled="!selectedRole || !formData.email"
                :loading="loadingState"
              >
                Make Admin
              </app-button>
            </div>
          </div>
        </app-table-header>
      </template>

      <app-admin-table
        :admins="AdminProfilePaginator.data"
        @change-role="changeAdminRole"
        @remove="removeAdmin"
      />
    </app-table-container>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, reactive } from "vue"
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
      const FormValidations = Logic.Form
      const itemsPerPage = 10
      const roleOptions = [
        { label: "Super Admin", value: "SuperAdmin" },
        { label: "Admin", value: "Admin" },
      ]

      // reactives
      const AuthUser = ref(Logic.Auth.AuthUser)
      const formComponent = ref<any>(null)
      const currentPageNumber = ref(1)
      const loadingState = ref(false)
      const searchQuery = ref("")
      const selectedRole = ref(null)
      const formData = reactive({ email: "" })

      const AdminProfilePaginator = ref(Logic.User.AdminProfilePaginator)

      // Methods for handling merchant actions
      const makeNewAdmin = async () => {
        if (!selectedRole) return

        loadingState.value = true
        // const state = formComponent.value?.validate()

        if (!formData.email) return console.log("Test")

        try {
          await Logic.Auth.SignUp(formData.email)
          Logic.User.GetAdminProfiles(itemsPerPage, currentPageNumber.value)
          formData.email = ""
        } catch (err) {
        } finally {
          loadingState.value = false
        }
      }

      const handlePageChange = (newPage: number) => {
        currentPageNumber.value = newPage
        Logic.User.GetAdminProfiles(itemsPerPage, currentPageNumber.value)
      }

      const changeAdminRole = async (adminRoleData: any) => {
        Logic.User.UpdateUserRolePayload = {
          uuid: adminRoleData.uuid,
          role: adminRoleData.role,
        }

        try {
          await Logic.User.UpdateUserRole()
          Logic.User.GetAdminProfiles(itemsPerPage, currentPageNumber.value)
        } catch (err) {}
      }

      const removeAdmin = (amin: any) => {
        console.log("amin", amin)
      }

      // Watch property
      onMounted(() => {
        Logic.User.watchProperty("AdminProfilePaginator", AdminProfilePaginator)
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      return {
        searchQuery,
        formData,
        selectedRole,
        roleOptions,
        AdminProfilePaginator,
        AuthUser,
        FormValidations,
        formComponent,
        loadingState,
        makeNewAdmin,
        removeAdmin,
        changeAdminRole,
        handlePageChange,
      }
    },
    data() {
      return {
        parentRefs: [],
      }
    },
    mounted() {
      const parentRefs: any = this.$refs
      this.parentRefs = parentRefs
    },
  })
</script>
