import { AxiosError, isAxiosError } from 'axios'

export const errorFormat = (error: AxiosError): string | undefined => {
  if (isAxiosError(error)) {
    return error!.response?.data.message.join(', ') as string
  }
}
