import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { useFavorite } from '../../../contexts/favorite/FavoriteContext'
import { Typography } from '@mui/material'
import Spinner from '../../../components/Spinner/Spinner'
import FavoriteItem from './FavoriteItem'
import './styles.scss'
import AuthButton from '../../../components/AuthButton'
import CatalogButton from '../../../components/CatalogButton'

const FavoritePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getFavoriteProducts, favoriteProducts } = useFavorite()
  const { user, isUserExist } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!isUserExist) return

    getFavoriteProducts(user.id)
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isUserExist])

  return (
    <div className="favorite">
      <div className="container">
        <div className="favorite-content">
          <Typography variant="h4" component="h1" fontWeight={500} textAlign="center">
            Избранное
          </Typography>

          <div className="products-list">
            {isUserExist ? loading ? <Spinner/> : favoriteProducts.length ? (
              favoriteProducts.map(favoriteProduct => (
                <FavoriteItem key={favoriteProduct.id} favoriteProduct={favoriteProduct}/>))
            ) : <CatalogButton/> : <AuthButton/>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default FavoritePage
