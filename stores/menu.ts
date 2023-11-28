import { MenuItem } from "primevue/menuitem"

interface State {
  items: MenuItem[]
}

const initialState = (): State => ({
  items: [
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
})

export const useMenu = defineStore('menu', {
  state: initialState,
  actions: {
    setMenus(items: MenuItem[]) {
      this.items = items
    }
  },
})