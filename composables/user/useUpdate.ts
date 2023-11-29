import { APIMessage } from "~/types/APIMessage"
import { UserModel } from "~/types/User"
import { getUserFromToken } from "~/utils/session"

export default function useUpdateDetails() {
  const auth = useAuth()
  const { user, isAuthenticated } = storeToRefs(auth)
  const users = useUsers()

  if (!isAuthenticated.value) {
    throw new Error('User is not authenticated')
  }

  const call = useFeedbackCall((dto: Partial<UserModel>) => {
    return $fetchAPI<APIMessage<UserModel>>(
      `/user/${dto.id}`, 
      { 
        method: 'PATCH',
        body: dto 
      }
    )
  })

  return (dto: Partial<UserModel>) => new Promise<void | APIMessage<UserModel>>((resolve, reject) => {
    (call(dto) as Promise<void | APIMessage<UserModel>>)
    .then((data) => {
      if(!data) return
      users.setUser(data.payload);

      const userFromToken = getUserFromToken();
      if(userFromToken.id === dto.id) {
        auth.setUser(data.payload)
      }
      resolve(data)
    })
      .catch(reject)
  }) 
}