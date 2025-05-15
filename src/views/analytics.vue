<template>
  <dashboard-layout>
    <AppTableContainer>
      <!-- title="Transaction Volume" -->
      <AppTableHeader
        title="Transaction Analytics"
        titleClass="flex-1"
        :showRightSide="false"
      >
        <AppDropdown
          v-model="selectedFilterOption"
          :options="dropdownOptions"
          placeholder="Filter by"
        />
      </AppTableHeader>

      <!-- Chart -->
      <div class="p-6 w-full h-fit !h-[620px] border">
        <apexchart
          type="line"
          :options="chartOptions"
          :series="series"
          height="100%"
        />
      </div>
    </AppTableContainer>
  </dashboard-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue"
  import ApexCharts from "vue3-apexcharts"
  import {
    AppDropdown,
    AppTableHeader,
    AppStatCard,
    AppTableContainer,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "TransactionVolumePage",
    components: {
      AppDropdown,
      AppTableHeader,
      AppStatCard,
      AppTableContainer,
      apexchart: ApexCharts,
    },

    middlewares: {
      fetchRules: [
        {
          domain: "Dashboard",
          property: "AnalyticsData",
          method: "GetAnalyticsData",
          params: [],
          requireAuth: true,
          ignoreProperty: true,
        },
      ],
    },
    setup() {
      const selectedFilterOption = ref("all_time")

      const dropdownOptions = [
        { label: "All Time", value: "all_time" },
        { label: "Today", value: "daily" },
        { label: "This Week", value: "weekly" },
        { label: "This Month", value: "monthly" },
        { label: "This Year", value: "yearly" },
      ]

      const AnalyticsData = ref(Logic.Dashboard.AnalyticsData)

      const series = ref([
        {
          name: "Money In",
          data: [
            AnalyticsData.value.daily.moneyIn,
            AnalyticsData.value.weekly.moneyIn,
            AnalyticsData.value.monthly.moneyIn,
            AnalyticsData.value.allTime.moneyIn,
          ],
        },
        {
          name: "Money Out",
          data: [
            AnalyticsData.value.daily.moneyOut,
            AnalyticsData.value.weekly.moneyOut,
            AnalyticsData.value.monthly.moneyOut,
            AnalyticsData.value.allTime.moneyOut,
          ],
        },
        {
          name: "Transactions",
          data: [
            AnalyticsData.value.daily.transactions,
            AnalyticsData.value.weekly.transactions,
            AnalyticsData.value.monthly.transactions,
            AnalyticsData.value.allTime.transactions,
          ],
        },
        {
          name: "Volume",
          data: [
            AnalyticsData.value.daily.volume,
            AnalyticsData.value.weekly.volume,
            AnalyticsData.value.monthly.volume,
            AnalyticsData.value.allTime.volume,
          ],
        },
      ])

      const chartOptions = ref({
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["white", "transparent"],
            opacity: 0.5,
          },
          clums: {
            colors: ["white", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["Daily", "Weekly", "Monthly", "All Time"],
        },
      })

      onMounted(() => {
        Logic.Dashboard.watchProperty("AnalyticsData", AnalyticsData)
      })

      return {
        selectedFilterOption,
        dropdownOptions,
        series,
        chartOptions,
        AnalyticsData,
      }
    },
  })
</script>
