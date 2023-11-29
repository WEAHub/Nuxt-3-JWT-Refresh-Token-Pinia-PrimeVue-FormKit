import { APIMessage } from "~/types/APIMessage"
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
          '/user/list', 
          { 
            method: 'GET', 
          }
        )
  
        this.setUsers(users)
  
      } catch (error) {
        throw error
      }
    },

    async updateUser(user: UserModel) {
      try {
        const user = await $fetchAPI<UserModel>(
          '/user/update', 
          { 
            method: 'PATCH', 
          }
        )
        
        this.setUser(user);

      } catch (error) {
        throw error
      }
    },

    async deleteUser(userId: string) {
      const userStoreIdx = this.users.findIndex(user => user.id === userId)
      if(userStoreIdx > -1) this.users.splice(userStoreIdx, 1)
    },

    setUser(user: UserModel) {
      const userStored = this.users.find(user => user.id === user.id)
      if(!!userStored) {
        Object.assign(userStored, user);
      }
    },

    setUsers(users: UserModel[]) {
      this.users = users
    },
  },
})