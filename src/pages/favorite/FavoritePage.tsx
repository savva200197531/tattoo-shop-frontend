import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'

const FavoritePage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getFavoriteProducts } = useFavorite()
  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)

    if (!user.id) return

    getFavoriteProducts(user.id).finally(() => {
      setLoading(false)
    })
  }, [user])

  return (
    <div>

    </div>
  )
}

export default FavoritePage
