import React, { ReactElement } from 'react'

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
  style?: React.CSSProperties
}
