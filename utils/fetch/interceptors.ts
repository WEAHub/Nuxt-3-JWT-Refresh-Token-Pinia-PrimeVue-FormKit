export const IGNORE_REFRESH_ROUTES = [
  '/api/auth/refresh', 
  '/api/auth/login',
  '/api/users/signup',
]

export const onRequestInterceptors = defineInterceptors<'onRequest'>([])
export const onResponseInterceptors = defineInterceptors<'onResponse'>([])
export const onRequestErrorInterceptors = defineInterceptors<'onRequestError'>([])
export const onResponseErrorInterceptors = defineInterceptors<'onResponseError'>([])