<template>
  <dashboard-layout>
    <div class="space-y-6">
      <app-table-container>
        <app-table-header title="General Overview" titleClass="flex-1">
          <app-dropdown
            :options="filterOptions"
            placeholder="Assign role"
            @update:modelValue="
              ($event) => Logic.Dashboard.GetGeneralOverview($event)
            "
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in mapOverviewData(GeneralOverview)"
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
            :options="filterOptions"
            placeholder="Assign role"
            @update:modelValue="
              ($event) => Logic.Dashboard.GetMerchantOverview($event)
            "
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in mapOverviewData(MerchantOverview)"
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
            :options="filterOptions"
            placeholder="Assign role"
            @update:modelValue="
              ($event) => Logic.Dashboard.GetCustomerOverview($event)
            "
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in mapOverviewData(CustomerOverview)"
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
            :options="filterOptions"
            placeholder="Assign role"
            @update:modelValue="
              ($event) => Logic.Dashboard.GetTransactionOverview($event)
            "
          />
        </app-table-header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <app-stat-card
            v-for="(metric, index) in mapOverviewData(TransactionOverview)"
            :key="index"
            :label="metric.label"
            :value="metric.value"
            :type="metric.type"
            :class="getBgColor(index, true)"
          />
        </div>
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
      const GeneralOverview = ref(Logic.Dashboard.GeneralOverview)
      const MerchantOverview = ref(Logic.Dashboard.MerchantOverview)
      const CustomerOverview = ref(Logic.Dashboard.CustomerOverview)
      const TransactionOverview = ref(Logic.Dashboard.TransactionOverview)

      const filterOptions = [
        { label: "All Time", value: "" },
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
      ]

      const getBgColor = (index: number, inverse = false) => {
        const isEven = index % 2 === 0
        if (inverse) {
          return isEven ? "bg-white" : "bg-gray-two-40"
        }
        return !isEven ? "bg-white" : "bg-gray-two-40"
      }

      const mapOverviewData = (obj: Record<string, any>): Metric[] => {
        const isCurrencyField = (key: string) =>
          [
            "moneyIn",
            "moneyOut",
            "volume",
            "income",
            "withdrawals",
            "shopSales",
            "fee",
          ].includes(key)

        return Object.entries(obj)
          .filter(([key]) => key !== "__typename")
          .map(([key, value]) => {
            const label = key
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .replace(/^./, (str) => str.toUpperCase())

            const type: Metric["type"] = isCurrencyField(key)
              ? "currency"
              : "number"
            const formattedValue =
              type === "currency"
                ? `$${Number(value).toLocaleString()}`
                : Number(value).toLocaleString()

            return { label, value: formattedValue, type }
          })
      }

      onMounted(() => {
        Logic.Dashboard.watchProperty("GeneralOverview", GeneralOverview)
        Logic.Dashboard.watchProperty("MerchantOverview", MerchantOverview)
        Logic.Dashboard.watchProperty("CustomerOverview", CustomerOverview)
        Logic.Dashboard.watchProperty(
          "TransactionOverview",
          TransactionOverview
        )
      })

      return {
        Logic,
        filterOptions,
        GeneralOverview,
        MerchantOverview,
        CustomerOverview,
        TransactionOverview,
        getBgColor,
        mapOverviewData,
      }
    },
  })
</script>
