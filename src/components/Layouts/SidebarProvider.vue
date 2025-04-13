
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Provide sidebar state and methods to all children
provide('isSidebarOpen', isSidebarOpen);
provide('toggleSidebar', toggleSidebar);
</script>