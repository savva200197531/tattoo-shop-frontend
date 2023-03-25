import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import FormInputSelect from '../../FormInputs/Select/FormInputSelect'
import { Brand, GetBrandsFilter } from '../../../contexts/productsFilters/BrandsContext/types'
import { useBrands } from '../../../contexts/productsFilters/BrandsContext/BrandsContext'
import { BaseFilterFieldProps } from './types'

const BrandFilter: React.FC<BaseFilterFieldProps> = ({ defaultValue }) => {
  const [brands, setBrands] = useState<Brand[]>([])

  const { getBrands } = useBrands()
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

  if (!brands.length) {
    return null
  }

  return (
    <FormInputSelect
      defaultValue={defaultValue}
      label="Бренд"
      name="brand"
      options={brands}
    />
  )
}

export default BrandFilter
