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
          inputStyle="text-sm"
        >
          <!-- :rules="[FormValidations.RequiredRule, FormValidations.PasswordRule]" -->
        </app-text-field>

        <!-- Button -->
        <div class="w-full flex flex-col items-center justify-center pt-5">
          <app-button
            @click.prevent="handleSignIn"
            class="w-full py-4"
            :loading="loadingState"
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
        email: "ufelidan@gmail.com",
        password: "12345678",
      })

      const loadingState = ref(false)
      const showStateSelector = ref(true)
      const stateIsoCode = ref("")
      const countryCode = ref("")

      const handleSignIn = async () => {
        const state = formComponent.value?.validate()
        console.log("state:::", state)

        if (state) {
          loadingState.value = true
          Logic.Auth.SignInPayload = {
            email: formData.email,
            password: formData.password,
          }

          try {
            const response = await Logic.Auth.SignIn(true)
            console.log("response", response)

            // await Logic.Auth.GetAuthUser()

            // Check if passcode has been set
            // if (localStorage.getItem("auth_passcode")) {
            //   Logic.Common.GoToRoute("/")
            // } else {
            //   // Save auth email and pass
            //   // localStorage.setItem(
            //   //   "auth_email",
            //   //   Logic.Auth.SignInPayload?.email || ""
            //   // )
            //   // localStorage.setItem(
            //   //   "auth_pass",
            //   //   Logic.Auth.SignInPayload?.password || ""
            //   // )
            //   // Logic.Common.GoToRoute("/auth/set-passcode")
            // }
          } catch (err) {
          } finally {
            loadingState.value = false
          }
        }
      }

      return {
        FormValidations,
        Logic,
        formData,
        stateIsoCode,
        countryCode,
        showStateSelector,
        formComponent,
        loadingState,
        handleSignIn,
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
