<template>
  <auth-layout title="Welcome Back">
    <div class="w-full h-full">
      <app-form-wrapper
        ref="formComponent"
        :parent-refs="parentRefs"
        class="w-full flex flex-col space-y-[20px] h-full"
      >
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

        <!-- Button -->
        <div class="w-full flex flex-col items-center justify-center pt-5">
          <app-button
            @click.prevent="Logic.Common.GoToRoute('/auth/signup')"
            class="w-full py-4"
          >
            Login
          </app-button>
        </div>
      </app-form-wrapper>
    </div>
  </auth-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, watch, ref } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppNormalText,
    AppSelect,
    AppInfoBox,
    AppButton,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppNormalText,
      AppSelect,
      AppInfoBox,
      AppButton,
    },
    props: {},
    name: "AuthLogin",
    setup() {
      const FormValidations = Logic.Form
      const formComponent = ref<any>(null)

      const formData = reactive({
        password: "",
        email: "",
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
