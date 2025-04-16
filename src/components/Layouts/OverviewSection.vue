<template>
  <div :class="['border border-light-gray-two rounded-lg relative', className]">
    <!-- <div
      class="relative flex justify-between items-center border-b border-gray-200 h-full"
    >
      <h2 class="text-lg py-4 px-6 font-medium flex-1 border-r">{{ title }}</h2>

      <AppDropdown
        v-model="selectedRole"
        :options="roleOptions"
        placeholder="Assign role"
      />
    </div> -->

 

    <AppTableHeader title="Merchants" class="!h-fit">
      <AppDropdown
        v-model="selectedRole"
        :options="roleOptions"
        placeholder="Assign role"
      />
    </AppTableHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        v-for="(metric, index) in metrics"
        :key="index"
        :label="metric.label"
        :value="metric.value"
        :type="metric.type"
        :class="getBgColor(index)"
        :is-last="index === metrics.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref } from "vue"
  import MetricCard from "./MetricCard.vue"
  import { AppIcon, AppDropdown, AppTableHeader } from "@greep/ui-components"

  type Metric = {
    label: string
    value: string
    type: "number" | "currency"
  }

  const props = defineProps<{
    title: string
    alternateFromWhite: boolean
    metrics: Metric[]
    className?: string
  }>()

  const isOpen = ref(true)
  const getBgColor = (index: number) => {
    const isEven = index % 2 === 0
    if (props.alternateFromWhite) {
      return isEven ? "bg-white" : "bg-gray-two-40"
    } else {
      return isEven ? "bg-gray-two-40" : "bg-white"
    }
  }

  const selectedRole = ref("admin")
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "User", value: "user" },
  ]
</script>
