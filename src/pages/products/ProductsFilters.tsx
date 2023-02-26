import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useProductsFilters } from '../../contexts/productsFilters/ProductsFiltersContext'
import Select from '../../components/Selects/Select'
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import { PriceRange, Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import Spinner from '../../components/Spinner/Spinner'
import { Option, OptionId } from '../../components/Selects/types'
import { Brand } from '../../contexts/productsFilters/types'

const sortOptions: Option[] = [
  {
    name: 'Обычная',
    id: 'id:DESC',
  },
  {
    name: 'Сначала новые',
    id: 'created_at:DESC',
  },
  {
    name: 'Сначала старые',
    id: 'created_at:ASC',
  },
  {
    name: 'Сначала дорогие',
    id: 'price:DESC',
  },
  {
    name: 'Сначала дешевые',
    id: 'price:ASC',
  },
]

type Props = {
  products: Product[]
}

const ProductsFilters: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [priceRange, setPriceRange] = useState<PriceRange>({} as PriceRange)

  const { getBrands } = useProductsFilters()
  const { getPriceRange } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const onSortChange = (value: OptionId) => {
    if (value) {
      searchParams.set('sort', value.toString())
    } else {
      searchParams.delete('sort')
    }
    setSearchParams(searchParams)
  }

  const onBrandChange = (value: OptionId) => {
    if (value) {
      searchParams.set('brand', value.toString())
    } else {
      searchParams.delete('brand')
    }
    setSearchParams(searchParams)
  }

  const onPriceChange = (value: OptionId[]) => {
    searchParams.set('price_min', value[0].toString())
    searchParams.set('price_max', value[1].toString())
    setSearchParams(searchParams)
  }

  useEffect(() => {
    setLoading(true)

    const category_id = searchParams.get('category')
    const search = searchParams.get('search')

    getBrands(category_id).then(data => setBrands(data)).catch(error => {
      console.log(error)
    })

    getPriceRange({ category_id, search })
      .then(data => setPriceRange(data))
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="products-filters">
      {loading ? <Spinner/> : (
        <Select
          defaultValue={searchParams.get('sort') || 0}
          onChange={onSortChange}
          label="Сортировка"
          options={sortOptions}
        />
      )}

      {loading ? <Spinner/> : (
        <Select
          defaultValue={Number(searchParams.get('brand')) || 0}
          onChange={onBrandChange}
          label="Бренд"
          options={brands}
        />
      )}

      {loading ? <Spinner/> : (
        <RangeSlider
          label="Цена"
          defaultValue={[
            Number(searchParams.get('price_min')) || priceRange.min,
            Number(searchParams.get('price_max')) || priceRange.max,
          ]}
          min={priceRange.min}
          max={priceRange.max}
          onChange={onPriceChange}
        />
      )}
    </div>
  )
}

export default ProductsFilters
