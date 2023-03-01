import React from 'react'
import FormInputSelect from '../../FormInputs/Select/FormInputSelect'
import { Option } from '../../FormInputs/Select/types'

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

const SortFilter: React.FC = () => {
  return (
    <FormInputSelect
      label="Сортировка"
      name="sort"
      options={options}
    />
  )
}

export default SortFilter
