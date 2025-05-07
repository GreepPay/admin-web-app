<template>
  <auth-layout>
    <app-form-wrapper ref="formComponent" :parent-refs="parentRefs">
      <div class="w-full flex flex-col space-y-5">
        <app-text-field inputStyle="text-sm" disabled>
          <template #inner-prefix>
            <span class="text-light-black"> ID </span>
          </template>
          <template #inner-suffix>
            <span class="text-light-black"> {{ formData.email }} </span>
          </template>
        </app-text-field>

        <AppDivider type="horizontal" customClass="!mb-5" />

        <!-- <div class="flex items-center gap-4"> -->
        <app-text-field
          :has-title="false"
          type="text"
          placeholder="First Name"
          ref="first_name"
          name="First Name"
          use-floating-label
          v-model="formData.first_name"
          :rules="[FormValidations.RequiredRule]"
          inputStyle="text-sm"
        >
        </app-text-field>

        <app-text-field
          :has-title="false"
          type="text"
          placeholder="Last Name"
          ref="last_name"
          name="Last Name"
          use-floating-label
          v-model="formData.last_name"
          :rules="[FormValidations.RequiredRule]"
          inputStyle="text-sm"
        >
        </app-text-field>

        <app-text-field
          :has-title="false"
          type="text"
          placeholder="Enter One Time Password (OTP)"
          ref="otp"
          name="One Time Password"
          use-floating-label
          v-model="formData.otp"
          :rules="[FormValidations.RequiredRule]"
          inputStyle="text-sm"
        >
        </app-text-field>
        <!-- </div> -->

        <app-text-field
          :has-title="false"
          type="password"
          placeholder="Password"
          ref="password"
          name="Password"
          use-floating-label
          v-model="formData.password"
          :rules="[FormValidations.RequiredRule, FormValidations.PasswordRule]"
          inputStyle="text-sm"
        >
        </app-text-field>

        <app-text-field
          :has-title="false"
          type="password"
          placeholder="Confirm Password"
          ref="confirm_password"
          name="Confirm Password"
          use-floating-label
          v-model="formData.confirm_password"
          :rules="[
            FormValidations.RequiredRule,
            FormValidations.handleConfirmPassword(
              formData.password,
              formData.confirm_password
            ),
          ]"
        >
        </app-text-field>
      </div>

      <!-- Button -->
      <div class="w-full flex flex-col items-center justify-center pt-5">
        <app-button
          @click.prevent="handleSignUp"
          class="w-full !py-4"
          :loading="loadingState"
        >
          Sign Up
        </app-button>
      </div>
    </app-form-wrapper>
  </auth-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from "vue"

  import {
    AppFormWrapper,
    AppTextField,
    AppButton,
    AppDivider,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { useRoute } from "vue-router"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppButton,
      AppDivider,
    },
    props: {},
    name: "AuthSignUp",
    setup() {
      const route = useRoute()
      const FormValidations = Logic.Form
      const formComponent = ref<any>(null)

      const formData = reactive({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        otp: "",
        confirm_password: "",
      })

      const loadingState = ref(false)

      const handleSignUp = async () => {
        const state = formComponent.value?.validate()

        if (state) {
          loadingState.value = true
          Logic.Auth.ActivateAccountPayload = {
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            otp: formData.otp,
            password: formData.password,
          }

          console.log(
            "  Logic.Auth.ActivateAccountPayload ",
            Logic.Auth.ActivateAccountPayload
          )

          try {
            await Logic.Auth.ActivateAdminAccount(true)
            Logic.Common.GoToRoute("/auth/login")
          } catch (err) {
          } finally {
            loadingState.value = false
          }
        }
      }

      onMounted(() => {
        const email = route.query.email as string

        if (!email) return Logic.Auth.AdminLogout()
        else formData.email = email
      })

      return {
        FormValidations,
        formData,
        formComponent,
        loadingState,
        handleSignUp,
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
