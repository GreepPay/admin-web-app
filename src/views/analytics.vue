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
      <div class="p-6">{{ selectedFilterOption }}</div>
    </AppTableContainer>
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

  const selectedFilterOption = ref("all_time")

  const dropdownOptions = [
    { label: "All Time", value: "all_time" },
    { label: "Today", value: "daily" },
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ]
</script>
