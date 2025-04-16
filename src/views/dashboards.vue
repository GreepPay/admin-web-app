<template>
  <dashboard-layout>
    <div class="space-y-6">
      <AppTableContainer>
        <AppTableHeader title="General Overview" titleClass="flex-1">
          <AppDropdown
            v-model="selectedRole"
            :options="roleOptions"
            placeholder="Assign role"
          />
        </AppTableHeader>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <AppStatCard
            v-for="(metric, index) in generalMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index)"
          />
        </div>
      </AppTableContainer>

      <!-- Merchants Overview -->
      <AppTableContainer>
        <AppTableHeader title="Merchants Overview" titleClass="flex-1">
          <AppDropdown
            v-model="selectedRole"
            :options="roleOptions"
            placeholder="Assign role"
          />
        </AppTableHeader>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <AppStatCard
            v-for="(metric, index) in merchantMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index, true)"
          />
        </div>
      </AppTableContainer>

      <!-- Customer Overview -->
      <AppTableContainer>
        <AppTableHeader title="Customer Overview" titleClass="flex-1">
          <AppDropdown
            v-model="selectedRole"
            :options="roleOptions"
            placeholder="Assign role"
          />
        </AppTableHeader>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <AppStatCard
            v-for="(metric, index) in customerMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index)"
          />
        </div>
      </AppTableContainer>

      <!-- Transaction Overview -->
      <AppTableContainer>
        <AppTableHeader title="Transaction Overview" titleClass="flex-1">
          <AppDropdown
            v-model="selectedRole"
            :options="roleOptions"
            placeholder="Assign role"
          />
        </AppTableHeader>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <AppStatCard
            v-for="(metric, index) in transactionMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index, true)"
          />
        </div>
      </AppTableContainer>
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import {
    AppDropdown,
    AppTableHeader,
    AppStatCard,
    AppTableContainer,
  } from "@greep/ui-components"

  type Metric = {
    label: string
    value: string
    type: "number" | "currency"
  }

  const selectedRole = ref("admin")

  const roleOptions = [
    { label: "Super Admin", value: "super-admin" },
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "User", value: "user" },
  ]

  const generalMetrics = ref<Metric[]>([
    { label: "Merchants", value: "150", type: "number" },
    { label: "Customers", value: "8,496", type: "number" },
    { label: "Transactions", value: "112,398", type: "number" },
    { label: "Volume", value: "10440750", type: "currency" },
  ])

  const merchantMetrics = ref<Metric[]>([
    { label: "Income", value: "$8,640,000", type: "currency" },
    { label: "Withdrawal", value: "$8,400,000", type: "currency" },
    { label: "Shop Sales", value: "$2,800,000", type: "currency" },
    { label: "Fee", value: "$255,900", type: "currency" },
  ])

  const customerMetrics = ref<Metric[]>([
    { label: "Sent", value: "$2,800,000", type: "currency" },
    { label: "Added", value: "$3,100,000", type: "currency" },
    { label: "Purchases", value: "$2,800,000", type: "currency" },
    { label: "Fee", value: "$480,000", type: "currency" },
  ])

  const transactionMetrics = ref<Metric[]>([
    { label: "Transactions", value: "112,398", type: "number" },
    { label: "Money In", value: "$10,440,750", type: "currency" },
    { label: "Money Out", value: "$10,440,750", type: "currency" },
    { label: "Volume", value: "$10,440,750", type: "currency" },
  ])

  //
  const getBgColor = (index: number, inverse: boolean = false) => {
    const isEven = index % 2 === 0
    if (inverse) {
      return isEven ? "bg-white" : "bg-gray-two-40"
    }
    return !isEven ? "bg-white" : "bg-gray-two-40"
  }

  // const currentCols = ref(4)

  // const updateCols = () => {
  //   const width = window.innerWidth
  //   if (width < 640) currentCols.value = 1 // sm
  //   else if (width < 768) currentCols.value = 2 // md
  //   else currentCols.value = 4 // lg+
  // }

  // onMounted(() => {
  //   updateCols()
  //   window.addEventListener("resize", updateCols)
  // })

  // onUnmounted(() => {
  //   window.removeEventListener("resize", updateCols)
  // })
</script>
