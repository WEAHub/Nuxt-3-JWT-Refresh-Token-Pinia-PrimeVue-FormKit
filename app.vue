<script setup lang="ts">
  import { useAuth } from '~/stores/auth.js'
  const store = useAuth()
</script>

<template>
  <NuxtLayout>
    <div class="flex justify-content-center m-5">
      <NuxtPage />
      <Toast />
    </div>
  </NuxtLayout>
</template>
