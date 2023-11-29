import { APIMessage } from "~/types/APIMessage"
import { UserModel } from "~/types/User"

export default function useUpdateDetails() {
  const { isAuthenticated } = storeToRefs(useAuth())

  if (!isAuthenticated.value) {
    throw new Error('User is not authenticated')
  }

  const call = useFeedbackCall((dto: Partial<UserModel>) => {
    return $fetchAPI<APIMessage<UserModel>>(
      `/user/update`, 
      { 
        method: 'PATCH',
        body: dto 
      }
    )
  })

  return (dto: Partial<UserModel>) => new Promise<void | APIMessage<UserModel>>((resolve, reject) => {
    (call(dto) as Promise<void | APIMessage<UserModel>>)
      .then(resolve)
      .catch(reject)
  }) 
}