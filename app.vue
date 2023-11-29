<script setup lang="ts">
  import { useAuth } from '~/stores/auth.js'
  const menus = useMenu()
  const store = useAuth()
</script>

<template>
  <NuxtLayout>
    <div class="m-5 flex-grow-1">
      <NuxtPage />
      <Toast />
    </div>
  </NuxtLayout>
</template>
