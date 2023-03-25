import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { GetPriceRangeFilter, PriceRange } from '../../../contexts/products/types'
import { FormInputRangeSlider } from '../../FormInputs/Slider/FormInputRangeSlider'
import { useProducts } from '../../../contexts/products/ProductsContext'
import Spinner from '../../Spinner/Spinner'
import { formatArrayFromUrl } from '../../../helpers/formatters/formatArrayFromUrl'

const PriceFilter: React.FC = () => {
  const [priceRange, setPriceRange] = useState<PriceRange>({} as PriceRange)
  const [loading, setLoading] = useState<boolean>(false)

  const [searchParams] = useSearchParams()
  const { getPriceRange } = useProducts()
  const { watch } = useFormContext()

  const priceRangeFromUrl = useRef(searchParams.get('price'))

  const category_id = watch('category')

  const loadPriceRange = (filter?: GetPriceRangeFilter) => {
    setLoading(true)

    const search = searchParams.get('search')

    getPriceRange({ search, ...filter })
      .then(data => setPriceRange(data))
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    category_id ? loadPriceRange({ category_id }) : loadPriceRange()
  }, [category_id])

  return (
    loading ? (
      <Spinner/>
    ) : (
      (priceRange.min && priceRange.max) ? (
        <FormInputRangeSlider
          label="Цена"
          name="price"
          min={priceRange.min}
          max={priceRange.max}
          defaultValue={[
            formatArrayFromUrl(priceRangeFromUrl.current)?.[0] || priceRange.min,
            formatArrayFromUrl(priceRangeFromUrl.current)?.[1] || priceRange.max,
          ]}
        />
      ) : <></>
    )
  )
}

export default PriceFilter
