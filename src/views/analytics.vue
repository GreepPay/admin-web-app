<template>
  <dashboard-layout>
    <AppTableContainer>
      <AppTableHeader title="Transaction Volume" titleClass="flex-1">
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
  import { defineComponent, ref } from "vue"
  import ApexCharts from "vue3-apexcharts"
  import {
    AppDropdown,
    AppTableHeader,
    AppStatCard,
    AppTableContainer,
  } from "@greep/ui-components"

  export default defineComponent({
    name: "TransactionVolumePage",
    components: {
      AppDropdown,
      AppTableHeader,
      AppStatCard,
      AppTableContainer,
      apexchart: ApexCharts,
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

      const series = ref([
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
          clums: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Apr 1",
            "Apr 2",
            "Apr 3",
            "Apr 4",
            "Apr 5",
            "Apr 6",
            "Apr 7",
            "Apr 8",
            "Apr 9",
            "Apr 10",
          ],
        },
      })

      return {
        selectedFilterOption,
        dropdownOptions,
        series,
        chartOptions,
      }
    },
  })
</script>
