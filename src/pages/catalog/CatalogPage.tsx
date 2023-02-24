import React, { useEffect, useState } from 'react'
import './style.scss'
import Spinner from '../../components/Spinner/Spinner'
import { useProductsFilters } from '../../contexts/productsFilters/ProductsFiltersContext'
import CategoryLayout from '../../components/CategoryLayout/CategoryLayout'
import { Typography } from '@mui/material'

const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { categories, getCategories } = useProductsFilters()

  useEffect(() => {
    setLoading(true)

    getCategories().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog-content">
          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mt: '80px', mb: '60px' }}>
            Каталог
          </Typography>

          {loading ? <Spinner/> : (
            <div className="categories-list">
              {categories.map(category => (
                <CategoryLayout key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
