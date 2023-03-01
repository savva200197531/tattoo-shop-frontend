import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Brand, GetBrandsFilter } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import FormInputSelect from '../../FormInputs/Select/FormInputSelect'

const BrandFilter: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])

  const { getBrands } = useProductsFilters()
  const { watch } = useFormContext()

  const category_id = watch('category')

  const loadBrands = (filter?: GetBrandsFilter) => {
    getBrands(filter)
      .then(data => {
        setBrands(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    category_id ? loadBrands({ category_id }) : loadBrands()
  }, [category_id])

  return (
    <FormInputSelect
      label="Бренд"
      name="brand"
      options={brands}
    />
  )
}

export default BrandFilter
