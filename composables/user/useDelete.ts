import { APIMessage } from "~/types/APIMessage"
import { UserModel } from "~/types/User"

export default function useDeleteUser() {
  const { isAuthenticated } = storeToRefs(useAuth())
  const users = useUsers()


  if (!isAuthenticated.value) {
    throw new Error('User is not authenticated')
  }

  const call = useFeedbackCall((dto: Partial<UserModel>) => {
    return $fetchAPI<APIMessage<UserModel>>(
      `/user/${dto.id}`, 
      { method: 'DELETE' }
    )
  }, true)

  return (dto: Partial<UserModel>) => new Promise<void | APIMessage<UserModel>>((resolve, reject) => {
    (call(dto) as Promise<void | APIMessage<UserModel>>)
      .then((data) => {
        users.deleteUser(dto.id!)
        resolve(data)
      })
      .catch(reject)
  }) 
}