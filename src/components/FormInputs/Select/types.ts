// export type OptionId = (number | string)
//
// export type Option = {
//   name: string
//   id: OptionId
// }
//
// export type BaseSelectProps = {
//   label: string
//   options: Option[]
// }
//
// export type BaseSelectInputProps = BaseSelectProps & {
//   name: string
// }

// new

import { ReactElement } from 'react'

export type SelectVariables = {
  [key: string | number]: string | number
}

export type OptionIcon = (option: Option) => ReactElement

export type Option = {
  id: number
  name: string
  [key: string]: any
}

export type BaseFormInputSelectProps = {
  name: string
  label: string
  options: Option[]
  optionIcon?: OptionIcon
  defaultValue?: number
}
