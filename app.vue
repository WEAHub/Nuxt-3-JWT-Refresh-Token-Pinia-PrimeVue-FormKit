<script setup lang="ts">
  import { useAuth } from '~/stores/auth.js'
  const store = useAuth()
  const menus = useMenu()
  menus.updateMenu()
</script>

<template>
  <NuxtLayout>
    <div class="flex-grow-1">
      <NuxtPage />
      <Toast />
    </div>
  </NuxtLayout>
</template>