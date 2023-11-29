<script lang="ts" setup>
import SidebarMenu from './SidebarMenu.vue';

  const visible = ref(false);

  const menu = useMenu()
  const { items: menuItems } = storeToRefs(menu)

  const auth = useAuth()
  const { isAuthenticated } = storeToRefs(auth)

  watch([isAuthenticated], () => menu.updateMenu())

  onMounted(() => {
    menu.updateMenu()
  })
</script>

<template>
  <ul class="menu hidden md:block">
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
  </ul>
</template>

<style lang="scss" scoped>
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