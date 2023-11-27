import { useAuth } from "stores/auth"
//import { useEventBus } from '@vueuse/core'

export const IGNORE_REFRESH_ROUTES = [
  '/api/auth/refresh', 
  '/api/auth/login',
  '/api/users/signup', 
]

export const onRequestInterceptors = defineInterceptors<'onRequest'>([
  {
    route: IGNORE_REFRESH_ROUTES,
    negateRoute: true,
    fn({ options }) {
      /*
      const { tokens } = storeToRefs(useAuth())
      if (tokens.value?.accessToken) {
        options.headers = {
          Authorization: `Bearer ${tokens?.value?.accessToken}`,
          ...options.headers,
        }
      }
       */
    },
  },
])

export const onResponseInterceptors = defineInterceptors<'onResponse'>([])

export const onRequestErrorInterceptors = defineInterceptors<'onRequestError'>([
  {
    route: '/api/auth/logout',
    fn() {
      // act as if logout is successful anyway
/*       const logoutEvent = useEventBus(LoggedOutEvent)
      const auth = useAuth()
      auth.setUser(null)
      auth.setTokens(null)
      logoutEvent.emit() */
    },
  },
])

export const onResponseErrorInterceptors = defineInterceptors<'onResponseError'>([
  {
    route: '/api/auth/logout',
    fn() {
      // act as if logout is successful anyway
/*       const logoutEvent = useEventBus(LoggedOutEvent)
      const auth = useAuth()
      auth.setUser(null)
      auth.setTokens(null)
      logoutEvent.emit() */
    },
  },
])