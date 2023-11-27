export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = storeToRefs(useAuth())
  if(isAuthenticated.value) {
    return navigateTo({
      path: '/admin/dashboard'
    })
  }
})