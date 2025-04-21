<template>
  <auth-layout>
    <div
      class="w-full flex flex-col items-center justify-start h-full space-y-6"
    >
      <app-form-wrapper
        ref="formComponent"
        :parent-refs="parentRefs"
        class="w-full flex flex-col space-y-[20px] h-full"
      >
        <app-text-field
          :has-title="false"
          type="password"
          placeholder="First Name"
          ref="first_name"
          name="First Name"
          use-floating-label
          v-model="formData.first_name"
          :rules="[FormValidations.RequiredRule]"
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
        >
        </app-text-field>

        <app-text-field
          :has-title="false"
          type="text"
          placeholder="Email Address"
          ref="email"
          name="Email"
          v-model="formData.email"
          use-floating-label
          :rules="[FormValidations.RequiredRule, FormValidations.EmailRule]"
        >
        </app-text-field>

        <AppButton variant="primary" customClass="w-full !py-4.5 !rounded-none">
          Make Admin
        </AppButton>
        <!-- Button -->
        <div class="w-full flex flex-col items-center justify-center pt-5">
          <AppButton @click.prevent="null" class="w-full py-3">
            Reset Password
          </AppButton>
        </div>
      </app-form-wrapper>
    </div>
  </auth-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, watch, ref } from "vue"
  import {
    AppButton,
    AppFormWrapper,
    AppTextField,
    AppNormalText,
    AppSelect,
    AppInfoBox,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppNormalText,
      AppSelect,
      AppInfoBox,
    },
    props: {},
    name: "AuthSetupAccountInfo",
    setup() {
      const FormValidations = Logic.Form
      const formComponent = ref<any>(null)

      const formData = reactive({
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        state: "",
      })

      const showStateSelector = ref(true)
      const stateIsoCode = ref("")
      const countryCode = ref("")

      return {
        FormValidations,
        Logic,
        formData,
        stateIsoCode,
        countryCode,
        showStateSelector,
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
