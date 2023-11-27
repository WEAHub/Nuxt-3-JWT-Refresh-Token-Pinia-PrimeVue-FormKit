import type { FetchError } from 'ofetch'

export default function useErrorToast() {
  const toast = useToast()

  function handleError(error: FetchError) {
    if (!error.response) {
      toast.add({
        severity: 'error',
        summary: 'unknown error',
        detail: { text: 'Network error' },
        life: 5000,
      })
      return
    }
    const { title, message } = error.response._data
    toast.add({
      severity: 'error',
      summary: title,
      detail: { text: message },
      life: 5000,
    })
    throw error
  }

  return handleError
}