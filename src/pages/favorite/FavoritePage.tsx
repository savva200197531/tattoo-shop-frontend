import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'
import { Typography } from '@mui/material'
import Spinner from '../../components/Spinner/Spinner'
import FavoriteItem from './FavoriteItem'
import './styles.scss'
import AuthButton from '../../components/AuthButton'

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
          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mt: '50px', mb: '70px' }}>
            Избранное
          </Typography>

          {isUserExist ? (
            <div className="products-list">
              {loading ? <Spinner /> : favoriteProducts.map(favoriteProduct => <FavoriteItem key={favoriteProduct.id} favoriteProduct={favoriteProduct} />)}
            </div>
          ) : (
            <AuthButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoritePage
