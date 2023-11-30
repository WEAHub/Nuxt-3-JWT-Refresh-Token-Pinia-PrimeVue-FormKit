import type { NitroFetchRequest } from 'nitropack'
import type { FetchAPIOptions } from './api/types'
import { $fetch } from 'ofetch'
import { useAuth } from '~/stores/auth'
import { configureRefreshFetch } from './api/refresh'
import { AuthResponse } from '~/types/User'

const $fetchRefresh = configureRefreshFetch({
  fetch: $fetch,
  refreshToken(fetch: any) {
    const auth = useAuth()
    return fetch('/api/auth/refresh')
      .then((response: AuthResponse) => {
        auth.setUser(response.user)
        auth.setTokens(response.tokens)
      })
      .catch((error: any) => {
        auth.logout()
        throw error
      })
  },
  shouldRefreshToken(url) {
    if (!url) return false

    const { isAuthenticated } = useAuth()
    const expiredToken = tokenIsExpired();

    return !!isAuthenticated
      && url.toString().startsWith('/api')
      && !IGNORE_REFRESH_ROUTES.includes(url.toString())
      && expiredToken
  },
})

export function $fetchAPI<T = unknown>(url: NitroFetchRequest, options: FetchAPIOptions = {}) {
  const actualMethod = options.method?.toUpperCase() as typeof options.method
  const actualOptions = { retry: 0, ...options, method: actualMethod } satisfies FetchAPIOptions

  const actualUrl = actualOptions.isNotApi === true ? url : `/api${url}`

  return $fetchRefresh<T>(actualUrl, {
    ...actualOptions,
    ...createFetchInterceptors(
      options.onRequest,
      options.onResponse,
      options.onRequestError,
      options.onResponseError,
    ),
  })
}