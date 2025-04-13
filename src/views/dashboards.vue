<template>
  <dashboard-layout>
    <div>
      <OverviewSection title="General Overview" :metrics="generalMetrics" />

      <OverviewSection
        title="Merchant Overview"
        :metrics="merchantMetrics"
        class="mt-5"
      />

      <OverviewSection
        title="Customer Overview"
        :metrics="customerMetrics"
        class="mt-5"
      />

      <OverviewSection
        title="Transaction Overview"
        :metrics="transactionMetrics"
        class="mt-5"
      />
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import {
    Sidebar,
    OverviewSection,
    DashboardHeader,
    SidebarProvider,
  } from "../components/Layouts/index.ts"

  type Metric = {
    label: string
    value: string
    type: "number" | "currency"
  }

  const generalMetrics = ref<Metric[]>([
    { label: "Merchants", value: "150", type: "number" },
    { label: "Customers", value: "8,496", type: "number" },
    { label: "Transactions", value: "112,398", type: "number" },
    { label: "Volume", value: "$10,440,750", type: "currency" },
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
</script>
