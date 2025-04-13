<template>
  <div :class="[
    'p-4 flex flex-col',
    !isLast && 'border-r border-gray-200'
  ]">
    <span class="text-gray-500 text-sm mb-2">{{ label }}</span>
    <span :class="[
      'text-2xl font-semibold',
      type === 'currency' ? 'text-green-600' : 'text-gray-800'
    ]">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  label: string;
  value: string;
  type: "number" | "currency";
  isLast?: boolean;
}>();
</script>