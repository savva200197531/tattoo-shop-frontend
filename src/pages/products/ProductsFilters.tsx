import React, { useEffect, useRef } from 'react'
import { useProductsFilters } from '../../contexts/productsFilters/ProductsFiltersContext'
import { useSearchParams } from 'react-router-dom'
import Select from '../../components/Selects/Select'
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import { Product } from '../../contexts/products/types'

type Props = {
  products: Product[]
}

const ProductsFilters: React.FC<Props> = ({ products }) => {
  const prices = useRef(products.map(product => product.price))

  const { brands, getBrands } = useProductsFilters()
  const [searchParams, setSearchParams] = useSearchParams()

  const onBrandChange = (value: number) => {
    if (value) {
      searchParams.set('brand', value.toString())
    } else {
      searchParams.delete('brand')
    }
    setSearchParams(searchParams)
  }

  const onPriceChange = (value: number[]) => {
    console.log(value)
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className="products-filters">
      <RangeSlider
        label="Цена"
        defaultValue={[
          Math.min(...prices.current),
          Math.max(...prices.current),
        ]}
        onChange={onPriceChange}
      />

      <Select
        defaultValue={Number(searchParams.get('brand')) || 0}
        onChange={onBrandChange}
        label="Бренд"
        options={brands}
      />
    </div>
  )
}

export default ProductsFilters
