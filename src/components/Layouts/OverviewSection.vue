<template>
  <div :class="['border border-light-gray-two rounded-lg', className]">
    <div class="flex justify-between items-center border-b border-gray-200">
      <h2 class="text-lg py-4 px-6 font-medium flex-1 border-r">{{ title }}</h2>

      <button
        class="text-sm space-x-2 text-gray-500 py-4 px-6 flex items-center"
      >
        <span> All time </span>
        <app-icon name="arrow-down" custom-class="h-5" />
      </button>
    </div>

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
  import { defineProps } from "vue"
  import MetricCard from "./MetricCard.vue"
  import { AppIcon } from "@greep/ui-components"

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

  const getBgColor = (index: number) => {
    const isEven = index % 2 === 0
    if (props.alternateFromWhite) {
      return isEven ? "bg-white" : "bg-gray-two-40"
    } else {
      return isEven ? "bg-gray-two-40" : "bg-white"
    }
  }
</script>
