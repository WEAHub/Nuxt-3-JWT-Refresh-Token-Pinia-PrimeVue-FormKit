<script lang="ts" setup>

definePageMeta({
  middleware: ['user-only']
});

</script>

<template>
  <div class="page-content">
    <AdminUsersTable/>
  </div>
</template>

<style scoped>

</style>