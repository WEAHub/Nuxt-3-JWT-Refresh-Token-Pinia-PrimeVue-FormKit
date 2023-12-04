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

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>