<script lang="ts" setup>
  //import { logout } from 'composables/auth';
  import { storeToRefs } from 'pinia'

  const route = useRoute()
  const auth = useAuth()
  const { isAuthenticated, user } = storeToRefs(auth)
  const inLoginPage: Ref<boolean> = computed(() => !!route.path.includes('/auth/login'))

</script>

<template>
  <div class="header surface-ground z-1 flex justify-content-center sticky top-0">
    <div class="header__content flex justify-content-between align-items-center h-5rem surface-section pl-5 pr-5">
      <div class="flex align-items-center gap-4">
        <NuxtLink to="/" custom v-slot="{ navigate }">
          <img 
            class="cursor-pointer" 
            id="logo" 
            @click="navigate" 
            src="~/assets/img/logo.svg"
          />
        </NuxtLink>
        
        <SidebarMenu/>

        <HeaderMenu/>
        
      </div>

      <div class="align-items-center gap-3 hidden md:flex">
        <span class="pointer-events-none">{{ user?.name }}</span>
        <Avatar 
          v-if="!!isAuthenticated" 
          :image=user?.avatarURL 
          class="mr-2"
          shape="circle" 
        />
        <Button 
          icon="pi pi-times"
          class="button p-button-outlined p-button-danger p-button-sm"
          label="Logout"
          v-if="!!isAuthenticated" 
          @click="auth.logout()" 
        ></Button>

        <NuxtLink to="/auth/login">
          <Button 
            icon="pi pi-user"
            class="p-button-outlined"
            label="Login"
            v-if="!isAuthenticated && !inLoginPage" 
          >
          </Button>
        </NuxtLink>
        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    border-bottom: 1px solid var(--surface-border);

    &__content {
      max-width: 70rem;
      width: 100%;
    }
  }

  #logo {
    width: 8rem;
  }
</style>