<script lang="ts" setup>

definePageMeta({
  middleware: ['user-only']
});

</script>

<template>
  <AdminUsersTable/>
</template>

<style scoped>

</style>