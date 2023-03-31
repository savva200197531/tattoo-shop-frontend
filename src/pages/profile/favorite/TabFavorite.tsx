import React from 'react'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { useFavorite } from '../../../contexts/favorite/FavoriteContext'

import { Typography } from '@mui/material'

import Spinner from '../../../components/Spinner/Spinner'
import FavoriteItem from './FavoriteItem'
import './styles.scss'
import AuthButton from '../../../components/AuthButton'
import CatalogButton from '../../../components/CatalogButton'

const TabFavorite: React.FC = () => {
  const { favoriteProducts, loading } = useFavorite()
  const { isUserExist } = useAuth()

  return (
    <div className="favorite">
      <div className="container">
        <div className="favorite-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Избранное
          </Typography>

          {isUserExist ? loading ? <Spinner/> : favoriteProducts.length ? (
            <div className="products-list">
              {favoriteProducts.map(favoriteProduct => (
                <FavoriteItem key={favoriteProduct.id} favoriteProduct={favoriteProduct}/>))}
            </div>
          ) : <CatalogButton/> : <AuthButton/>}

        </div>
      </div>
    </div>
  )
}

export default TabFavorite
