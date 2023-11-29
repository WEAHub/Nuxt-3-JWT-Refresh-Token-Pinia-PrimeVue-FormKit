<script lang="ts" setup>
definePageMeta({
  middleware: ['user-only']
});
</script>

<template>
  <AdminDashboardUserInformation/>
</template>