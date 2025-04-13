
<template>
  <div :class="['border border-gray-200 rounded-lg', className]">
    <div class="p-4 flex justify-between items-center border-b border-gray-200">
      <h2 class="text-lg font-medium">{{ title }}</h2>
      <button class="text-sm text-gray-500 flex items-center">
        All time
        <ChevronDownIcon class="ml-1" />
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard 
        v-for="(metric, index) in metrics" 
        :key="index"
        :label="metric.label"
        :value="metric.value"
        :type="metric.type"
        :is-last="index === metrics.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import MetricCard from './MetricCard.vue';
// import { ChevronDownIcon } from './icons';

type Metric = {
  label: string;
  value: string;
  type: "number" | "currency";
};

const props = defineProps<{
  title: string;
  metrics: Metric[];
  className?: string;
}>();
</script>