import React from 'react'

import { Typography } from '@mui/material'

import CategoriesList from '../../components/CategoriesList/CategoriesList'
import './style.scss'

const CatalogPage: React.FC = () => {
  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Каталог
          </Typography>

          <CategoriesList />
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
