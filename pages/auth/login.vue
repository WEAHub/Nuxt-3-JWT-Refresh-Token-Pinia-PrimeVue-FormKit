<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only']
});
</script>

<template>
  <div class="flex justify-content-center">
    <div class="surface-card p-5 border-round-md shadow-3">
      <FormsLogin/>
    </div>
  </div>
</template>