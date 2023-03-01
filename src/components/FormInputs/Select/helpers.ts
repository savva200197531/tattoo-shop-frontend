import { Option } from './types'

export const formatOptions = (options: Option[]) => {
  return [
    {
      id: 0,
      name: 'Не выбрано',
    },
    ...options,
  ]
}
