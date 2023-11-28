import { defineStore } from "pinia"
import { FetchError } from 'ofetch'
import { Nullable } from "primevue/ts-helpers"
import { JWTokens, User, AuthResponse } from "types/User"

export interface UseAuthComposer {
  user: Ref<Nullable<User>>
  tokens: Ref<Nullable<JWTokens>>
  isAuthenticated: ComputedRef<boolean>

  setUser: (newUser: Nullable<Partial<User>>) => void
  setTokens: (newTokens: Nullable<JWTokens>) => void
  login: (values: User) => Promise<void>
  logout: (abortLogin?: boolean) => Promise<void>
}


export const useAuth = defineStore('auth', (): UseAuthComposer => {

  const user = ref<Nullable<User>>(null)
  const tokens = ref<Nullable<JWTokens>>(null)
  const isAuthenticated = computed(() => !!tokens.value)

  async function login(credentials: User) {
    
    try {
      const { tokens, user } = await $fetchAPI<AuthResponse>(
        '/auth/login', { 
          method: 'POST', 
          body: credentials 
        }
      )

      setTokens(tokens);
      setUser(user);

      navigateTo({
        path: '/admin/dashboard'
      })

    } catch (error) {
      throw error
    }
  }

  async function logout() {
    setTokens(null)
    setUser(null)

    navigateTo({
      path: '/'
    })
  }

  function setTokens(newTokens: Nullable<JWTokens>) {
    tokens.value = newTokens
  }

  function setUser(newUser: Nullable<Partial<User>>) {
    if (!newUser) {
      user.value = null
      return
    }

    if (!user.value) {
      user.value = newUser as User
      return
    }

    Object.assign(user.value, newUser)
  }

  return {
      user,
      tokens,
      isAuthenticated,

      setUser,
      setTokens,
      login,
      logout,
    }
}, {
  persist: true,
})

