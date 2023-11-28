<script lang="ts" setup>
  const visible = ref(false);
  const menu = useMenu()
  const {items: menuItems} = storeToRefs(menu)

</script>

<template>
  <Sidebar v-model:visible="visible" header="Menu">
    
  </Sidebar>
  <Button 
    icon="pi pi-bars" 
    class="button p-button-outlined md:hidden"
    @click="visible = true" 
  />
</template>