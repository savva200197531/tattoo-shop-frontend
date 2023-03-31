import React from 'react'
import FormInputSelect from '../../FormInputs/Select/FormInputSelect'
import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import { BaseFilterFieldProps } from './types'

const CategoryFilter: React.FC<BaseFilterFieldProps> = ({ defaultValue }) => {
  const { categories } = useCategories()

  return (
    <FormInputSelect
      defaultValue={defaultValue}
      label="Категория товара"
      name="category"
      options={categories}
    />
  )
}

export default CategoryFilter
