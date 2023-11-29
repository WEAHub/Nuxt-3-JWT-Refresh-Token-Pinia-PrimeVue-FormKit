import { UserModel } from "~/types/User"

interface State {
  users: UserModel[]
}

const initialState = (): State => ({ users: [] })

export const useUsers = defineStore('users', {
  state: initialState,
  actions: {
    async getUsers() {
      try {

        const { users } = await $fetchAPI<State>(
          '/user/list', { 
            method: 'GET', 
          }
        )
  
        this.setUsers(users)
  
      } catch (error) {
        throw error
      }
    },
    setUsers(users: UserModel[]) {
      this.users = users
    }
  },
})