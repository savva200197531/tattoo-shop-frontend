export type OptionId = (number | string)

export type Option = {
  name: string
  id: OptionId
}

export type BaseSelectProps = {
  label: string
  options: Option[]
}

export type BaseSelectInputProps = BaseSelectProps & {
  name: string
}
