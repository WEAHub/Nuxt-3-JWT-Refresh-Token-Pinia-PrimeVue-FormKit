<script lang="ts" setup>
  //import { logout } from 'composables/auth';
  import { storeToRefs } from 'pinia'
  import { MenuItem } from 'types/MenuItem';

  const route = useRoute()
  const auth = useAuth()
  const { isAuthenticated, user } = storeToRefs(auth)
  const inLoginPage: Ref<boolean> = ref(false)
  const menuItems: Ref<MenuItem[]> = ref(
    [
      {
        path: '/',
        label: 'Home',
        icon: 'pi pi-home',
        visible: true,
        adminOnly: false,
      },
      {
        path: '/admin/dashboard',
        label: 'Dashboard',
        icon: 'pi pi-id-card',
        visible: false,
        adminOnly: true
      }
    ]
  )

  watchEffect(() =>  updateHeader())
  

  function doLogout() {
    auth.logout();
  }

  function updateHeader() {
    // Hide/Show Login Button
     inLoginPage.value = !!route.path.includes('/auth/login')

    // Hide/Show Menu Items
    menuItems.value = menuItems.value.map(
      (menuItem: MenuItem) => ({
      ...menuItem,
      visible: menuItem.adminOnly && !!isAuthenticated.value || !menuItem.adminOnly
    }))
  }
  onBeforeMount(() => {
    updateHeader()
  })
</script>

<template>
  <div id="header" class="flex justify-content-between h-5rem p-2 pl-4 pr-4 surface-section">
    
    <!-- LOGO & MENU LINKS-->
    <div class="flex align-items-center gap-4">
      <router-link to="/" custom v-slot="{ navigate }">
        <img 
          class="cursor-pointer" 
          id="logo" 
          @click="navigate" 
          src="~/assets/img/logo2.svg"
        />
      </router-link>
      <ul class="menu">
        <li class="menu__item" v-for="menuItem in menuItems">
          <router-link 
            v-if="menuItem.visible" 
            :to="menuItem.path"
            v-slot="{isActive}"
          >      
            <span 
              class="menu__link border-round-sm"
              :class="{
                'menu__link--active': isActive
              }"
            >
              <i :class="menuItem.icon"></i>
              {{ menuItem.label }}
            </span>
          </router-link>
        </li>
      </ul>
      
    </div>

    <!-- RIGHT BUTTONS -->
    <div class="flex align-items-center gap-3">
      <span class="pointer-events-none">{{ user?.name }}</span>
      <Button 
        icon="pi pi-times"
        class="button p-button-outlined p-button-danger p-button-sm"
        label="Logout"
        v-if="!!isAuthenticated" 
        @click="doLogout" 
      ></Button>

      <router-link to="/auth/login" custom v-slot="{ navigate }">
        <Button 
          icon="pi pi-user"
          class="p-button-outlined"
          label="Login"
          @click="navigate"
          v-if="!isAuthenticated && !inLoginPage" 
        >
        </Button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #header {
    border-bottom: 1px solid var(--surface-border);
    align-items: center;
  }

  #logo {
    width: 8rem;
  }

  .menu {
    padding: 0;
    margin: 0;

    &__item {
      vertical-align: top;
      display: inline;
    }

    &__link {
      padding: .5rem 1rem .5rem 1rem;
      margin: 0 .2rem;
      color: var(--text-color);

      i {
        margin-right: .2rem;
      }

      &:hover {
        background: var(--surface-50);
      }

      &--active {
        background: var(--surface-card);
      }
    }

    a {
      text-decoration: none;
    }
  }
</style>