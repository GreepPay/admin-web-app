<template>
  <dashboard-layout>
    <div class="space-y-6">
      <app-table-container>
        <app-table-header title="General Overview" titleClass="flex-1">
          <app-dropdown
            v-model="generalOverviewFilterOption"
            :options="filterOptions"
            placeholder="Assign role"
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in generalMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index)"
          />
        </div>
      </app-table-container>

      <app-table-container>
        <app-table-header title="Merchants Overview" titleClass="flex-1">
          <app-dropdown
            v-model="merchantOverviewFilterOption"
            :options="filterOptions"
            placeholder="Assign role"
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in merchantMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index, true)"
          />
        </div>
      </app-table-container>

      <app-table-container>
        <app-table-header title="Customer Overview" titleClass="flex-1">
          <app-dropdown
            v-model="customerOverviewFilterOption"
            :options="filterOptions"
            placeholder="Assign role"
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in customerMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index)"
          />
        </div>
      </app-table-container>

      <app-table-container>
        <app-table-header title="Transaction Overview" titleClass="flex-1">
          <app-dropdown
            v-model="transactionOverviewFilterOption"
            :options="filterOptions"
            placeholder="Assign role"
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in transactionMetrics"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index, true)"
          />
        </div>

        <pre>
      {{ GeneralOverview }}
      </pre
        >
        <pre>
      {{ MerchantOverview }}
      </pre
        >
        <pre>
      {{ TransactionOverview }}
      </pre
        >

        <pre>
      {{ CustomerOverview }}
      </pre
        >
      </app-table-container>
    </div>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue"
  import {
    AppDropdown,
    AppTableHeader,
    AppStatCard,
    AppTableContainer,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  type Metric = {
    label: string
    value: string
    type: "number" | "currency"
  }

  export default defineComponent({
    name: "DashboardPage",
    components: {
      AppDropdown,
      AppTableHeader,
      AppStatCard,
      AppTableContainer,
    },
    middlewares: {
      fetchRules: [
        {
          domain: "Dashboard",
          property: "GeneralOverview",
          method: "GetGeneralOverview",
          params: [],
          requireAuth: true,
        },
        {
          domain: "Dashboard",
          property: "MerchantOverview",
          method: "GetMerchantOverview",
          params: [],
          requireAuth: true,
        },
        {
          domain: "Dashboard",
          property: "CustomerOverview",
          method: "GetCustomerOverview",
          params: [],
          requireAuth: true,
        },
        {
          domain: "Dashboard",
          property: "TransactionOverview",
          method: "GetTransactionOverview",
          params: [],
          requireAuth: true,
        },
      ],
    },
    setup() {
      const generalOverviewFilterOption = ref("")
      const merchantOverviewFilterOption = ref("")
      const customerOverviewFilterOption = ref("")
      const transactionOverviewFilterOption = ref("")

      const filterOptions = [
        { label: "All Time", value: "" },
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
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

      const getBgColor = (index: number, inverse = false) => {
        const isEven = index % 2 === 0
        if (inverse) {
          return isEven ? "bg-white" : "bg-gray-two-40"
        }
        return !isEven ? "bg-white" : "bg-gray-two-40"
      }

      // const GetProfiles = async () => {
      //   const response = await Logic.User.GetAllAdminProfiles()
      //   console.log("response", response)
      // }

      const GeneralOverview = ref(Logic.Dashboard.GeneralOverview)
      const MerchantOverview = ref(Logic.Dashboard.MerchantOverview)
      const CustomerOverview = ref(Logic.Dashboard.CustomerOverview)
      const TransactionOverview = ref(Logic.Dashboard.TransactionOverview)

      onMounted(async () => {
        Logic.User.watchProperty("GeneralOverview", GeneralOverview)
        Logic.User.watchProperty("MerchantOverview", MerchantOverview)
        Logic.User.watchProperty("CustomerOverview", CustomerOverview)
        Logic.User.watchProperty("TransactionOverview", TransactionOverview)
      })

      return {
        generalOverviewFilterOption,
        merchantOverviewFilterOption,
        customerOverviewFilterOption,
        transactionOverviewFilterOption,
        filterOptions,
        generalMetrics,
        merchantMetrics,
        customerMetrics,
        transactionMetrics,
        getBgColor,
        CustomerOverview,
        TransactionOverview,
        GeneralOverview,
        MerchantOverview,
      }
    },
  })
</script>
