import { MenuItem } from "primevue/menuitem"

export interface UseMenuComposer {
  items: Ref<MenuItem[]>
  updateMenu: () => void;
}

const initialMenuItems: MenuItem[] = [
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
  },
  {
    path: '/admin/users',
    label: 'Users',
    icon: 'pi pi-users',
    visible: false,
    adminOnly: true
  }
]

export const useMenu = defineStore('menu', (): UseMenuComposer => {
  const items: Ref<MenuItem[]> = ref(initialMenuItems)

  const auth = useAuth();
  const { isAuthenticated } = storeToRefs(auth)

  function updateMenu(): void {
    const menuItemsUpdate = items.value.map((menuItem: MenuItem) => ({
      ...menuItem,
      visible: menuItem.adminOnly && !!isAuthenticated.value || !menuItem.adminOnly
    }))
    
    items.value = menuItemsUpdate;
  }

  return {
    items,

    updateMenu
  }
})