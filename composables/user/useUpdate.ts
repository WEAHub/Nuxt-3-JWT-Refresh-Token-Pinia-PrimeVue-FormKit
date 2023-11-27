import { APIMessage } from "~/types/APIMessage"
import { User } from "~/types/User"

export default function useUpdateDetails() {
  const { user, isAuthenticated } = storeToRefs(useAuth())

  if (!isAuthenticated.value) {
    throw new Error('User is not authenticated')
  }

  const call = useFeedbackCall((dto: Partial<User>) => {
    return $fetchAPI<APIMessage<User>>(
      `/user/update`, 
      { 
        method: 'PATCH',
        body: dto 
      }
    )
  }, true)

  return (dto: Partial<User>) => new Promise<void | APIMessage<User>>((resolve, reject) => {
    (call(dto) as Promise<void | APIMessage<User>>)
      .then(resolve)
      .catch(reject)
  }) 
}