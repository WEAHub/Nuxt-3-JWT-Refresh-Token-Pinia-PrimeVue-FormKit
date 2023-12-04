<script lang="ts" setup>
definePageMeta({
  middleware: ['user-only']
});
</script>

<template>
  <div class="page-content">
    <AdminDashboardUserInformation/>
  </div>
</template>