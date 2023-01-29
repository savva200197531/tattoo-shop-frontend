import React from 'react'
import { Favorite } from '../../contexts/favorite/types'

type Props = {
  favoriteProduct: Favorite
}

const FavoriteItem: React.FC<Props> = ({ favoriteProduct }) => {
  const { product, user, id } = favoriteProduct

  return (
    <div>
      {product.name}
    </div>
  )
}

export default FavoriteItem
