export const IGNORE_REFRESH_ROUTES = [
  '/api/auth/refresh', 
  '/api/auth/login',
  '/api/users/signup',
]

export const onRequestInterceptors = defineInterceptors<'onRequest'>([
  {
    route: IGNORE_REFRESH_ROUTES,
    negateRoute: true,
    fn({ options }) { },
  },
])

export const onResponseInterceptors = defineInterceptors<'onResponse'>([])

export const onRequestErrorInterceptors = defineInterceptors<'onRequestError'>([])

export const onResponseErrorInterceptors = defineInterceptors<'onResponseError'>([])