<template>
  <dashboard-layout>
    <div class="h-[600px]">
      ewew
      <PDFViewer :url="pdfUrl" />
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
  import { PDFSrc } from "@vue-pdf-viewer/viewer"

  const pdfUrl = "/sample.pdf"
</script>
