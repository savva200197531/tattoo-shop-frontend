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

export type SelectVariables = {
  [key: string | number]: string | number
}

export type Option = {
  id: number
  name: string
}

export type BaseFormInputSelectProps = {
  name: string
  label: string
  options: Option[]
}
