import React from 'react'
import FormInputSelect from '../../FormInputs/Select/FormInputSelect'
import { Option } from '../../FormInputs/Select/types'
import { BaseFilterFieldProps } from './types'

const options: Option[] = [
  {
    name: 'Сначала новые',
    id: 1,
  },
  {
    name: 'Сначала старые',
    id: 2,
  },
  {
    name: 'Сначала дорогие',
    id: 3,
  },
  {
    name: 'Сначала дешевые',
    id: 4,
  },
]

const SortFilter: React.FC<BaseFilterFieldProps> = ({ defaultValue }) => {
  return (
    <FormInputSelect
      label="Сортировка"
      defaultValue={defaultValue}
      name="sort"
      options={options}
    />
  )
}

export default SortFilter
