import React, { useEffect, useState } from 'react'
import './style.scss'
import Spinner from '../../components/Spinner/Spinner'
import { useProductsFilters } from '../../contexts/productsFilters/ProductsFiltersContext'
import CategoryLayout from '../../components/CategoryLayout/CategoryLayout'
import { Typography } from '@mui/material'
import { Category } from '../../contexts/productsFilters/types'

const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories } = useProductsFilters()

  useEffect(() => {
    setLoading(true)

    getCategories()
      .then(data => setCategories(data))
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center" sx={{ mb: '60px' }}>
            Каталог
          </Typography>

          {loading ? <Spinner/> : (
            <div className="categories-list">
              {categories.map(category => (
                <CategoryLayout key={category.id} category={category}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
