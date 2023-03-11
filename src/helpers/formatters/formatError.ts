import { AxiosError, isAxiosError } from 'axios'

export const formatError = (error: AxiosError): string | undefined => {
  if (isAxiosError(error)) {
    return error!.response?.data.message.join(', ') as string
  }
}
