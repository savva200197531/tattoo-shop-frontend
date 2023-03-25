import React, { useEffect, useState } from 'react'
import FormInputSelect from '../../FormInputs/Select/FormInputSelect'
import { Category } from '../../../contexts/productsFilters/CategoriesContext/types'
import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'
import { BaseFilterFieldProps } from './types'

const CategoryFilter: React.FC<BaseFilterFieldProps> = ({ defaultValue }) => {
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories } = useCategories()

  const loadCategories = () => {
    getCategories().then(data => setCategories(data)).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

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
