import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import './style.scss'
import Spinner from '../../components/Spinner/Spinner'
import CategoryLayout from '../../components/CategoryLayout/CategoryLayout'
import { Category } from '../../contexts/productsFilters/CategoriesContext/types'
import { useCategories } from '../../contexts/productsFilters/CategoriesContext/CategoriesContext'

const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories } = useCategories()

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
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
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
