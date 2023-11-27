<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only']
});
</script>

<template>
  <div class="w-20rem p-5 surface-card border-round-lg">
    <FormsLogin/>
  </div>
</template>