
import useToastError from '~/composables/useToastError'
import { APIMessage } from '~/types/APIMessage'

export default function useFeedbackCall<
  T,
  F extends (...args: Parameters<F>) => Promise<APIMessage<T>>,
>(requestFactory: F, ignoreErrors = false) {
  const toast = useToast()
  const handleError = useToastError()

  return function call(...args: Parameters<F>): Promise<APIMessage<T> | void> {
    return requestFactory(...args)
      .then((response: APIMessage<T>) => {
        toast.add({
          severity: 'success',
          summary: response.title,
          detail: response.message,
          life: 5000,
        })
        return response satisfies APIMessage<T>
      })
      .catch((error) => {
        if (ignoreErrors) throw error
        handleError(error)
      })
  }
}