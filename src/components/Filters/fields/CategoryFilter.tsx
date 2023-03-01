import React, { useEffect, useState } from 'react'
import { Category } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import FormInputSelect from '../../FormInputs/Select/FormInputSelect'

const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories } = useProductsFilters()

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
      label="Категория товара"
      name="category"
      options={categories}
    />
  )
}

export default CategoryFilter
