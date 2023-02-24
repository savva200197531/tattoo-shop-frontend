export type Option = {
  name: string
  id: number
}

export type BaseSelectProps = {
  label: string
  options: Option[]
}

export type BaseSelectInputProps = BaseSelectProps & {
  name: string
}
