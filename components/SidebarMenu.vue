<script lang="ts" setup>
  const visible = ref(false);
  const menu = useMenu()
  const {items: menuItems} = storeToRefs(menu)

  const auth = useAuth()
  const { isAuthenticated, user } = storeToRefs(auth)

  const route = useRoute()
  const inLoginPage: Ref<boolean> = computed(() => !!route.path.includes('/auth/login'))

  watch(() => ref(route.path), () => visible.value = !visible)
</script>

<template>
  <Sidebar v-model:visible="visible" header="Menu" ref="sidebar">
    <template #container="{ closeCallback }">
      <div class="flex flex-column h-full">
        <div class="flex align-items-center justify-content-between px-4 pt-3 pb-2 flex-shrink-0">
          <span class="inline-flex align-items-center gap-2">
            <div 
              v-if="!!isAuthenticated" 
              class="flex align-items-center"
            >
              <Avatar 
                :image=user?.avatarURL 
                class="mr-2" 
                shape="circle" 
              />
              <span class="font-semibold text-xl pointer-events-none">{{ user?.name }}</span>
            </div>
            <span 
              v-if="!isAuthenticated" 
              class="font-semibold text-2xl text-primary"
            >Menu</span>
          </span>
          <span>
              <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
          </span>
        </div>
        <ul class="menu">
          <li class="menu__item" v-for="menuItem in menuItems">
            <NuxtLink
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
            </NuxtLink>
          </li>
          <li class="menu__item">
            <Button 
              icon="pi pi-times"
              class="button p-button-outlined p-button-danger p-button-sm"
              label="Logout"
              v-if="!!isAuthenticated" 
              @click="auth.logout()" 
            ></Button>
          </li>
          <li>
            <NuxtLink to="/auth/login">
              <Button 
                icon="pi pi-user"
                class="p-button-outlined"
                label="Login"
                v-if="!isAuthenticated && !inLoginPage" 
              >
              </Button>
            </NuxtLink>
          </li>
        </ul>
      </div>
      
    </template>
  </Sidebar>
  <Button 
    icon="pi pi-bars" 
    class="button p-button-outlined md:hidden"
    @click="visible = true" 
  />
</template>

<style lang="scss" scoped>
.menu {
    padding: 1rem .5rem;
    margin: .5rem;
    list-style: none;
    border-top: 1px solid #2b2b2b;

    &__item {
      margin-bottom: 1rem;
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