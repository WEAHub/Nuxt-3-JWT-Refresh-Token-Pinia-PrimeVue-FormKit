import { NuxtError } from 'nuxt/app'
import type { FetchError } from 'ofetch'
import { ToastMessageOptions } from 'primevue/toast'

export default function useErrorToast() {
  const toast = useToast()

  function handleError(error: FetchError) {
    const toastTemplate = {
      generic: {
        summary: 'Unknown error',
        detail: 'Network error',
      },
      default: (response: NuxtError) => ({
        summary: response.statusMessage,
        detail: response.message,
      })
    }

    const hasResponse = !!error.response;

    const toastConfigTemplate = hasResponse
    ? toastTemplate.default(error.response?._data!)
    : toastTemplate.generic;

    const toastConfig: ToastMessageOptions = {
      life: 5000,
      severity: 'error',
      ...toastConfigTemplate,
    }
    
    toast.add(toastConfig);

    if(!hasResponse) {
      throw error
    }
  }

  return handleError
}