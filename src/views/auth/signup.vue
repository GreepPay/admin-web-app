<template>
  <auth-layout>
    <app-form-wrapper ref="formComponent" :parent-refs="parentRefs">
      <div class="w-full flex flex-col space-y-5">
        <app-text-field inputStyle="text-sm" disabled>
          <template #inner-prefix>
            <span class="text-light-black"> ID </span>
          </template>
          <template #inner-suffix>
            <span class="text-light-black"> scrpt@gmail.com </span>
          </template>
        </app-text-field>

        <AppDivider type="horizontal" customClass="!mb-5" />

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
          @click.prevent="Logic.Common.GoToRoute('/dashboards')"
          class="w-full !py-4"
        >
          Sign Up
        </app-button>
      </div>
    </app-form-wrapper>
  </auth-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppButton,
    AppDivider,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

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
      const FormValidations = Logic.Form
      const formComponent = ref<any>(null)

      const formData = reactive({
        password: "",
        confirm_password: "",
      })

      return {
        FormValidations,
        Logic,
        formData,
        formComponent,
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
