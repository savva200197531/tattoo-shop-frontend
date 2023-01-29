import React from 'react'
import { CartItem } from '../../contexts/cart/types'
import { AddToFavoritePayload } from '../../contexts/favorite/types'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'
import Svg from '../Svg'
import IconButton from '@mui/material/IconButton'

type Props = {
  product_id: number
  user_id: number
  onSubmit: (promise: Promise<CartItem>) => void
  isFavorite: boolean
  id?: number
}

const AddToFavorite: React.FC<Props> = ({ product_id, onSubmit, user_id, isFavorite, id }) => {
  const { addToFavorite, deleteFromFavorite } = useFavorite()

  const handleAddToFavorite = () => {
    const payload: AddToFavoritePayload = {
      product_id,
      user_id,
    }

    onSubmit(addToFavorite(payload))
  }

  const handleDeleteFromFavorite = () => {
    if (!id) return

    onSubmit(deleteFromFavorite(id))
  }

  return (
    <IconButton
      style={{ position: 'absolute' }}
      className="product-item__favorite"
      onClick={() => {
        isFavorite ? handleDeleteFromFavorite() : handleAddToFavorite()
      }}
      type="button"
      sx={{ p: '6px' }}
    >
      <Svg fill={isFavorite ? 'red' : 'black'} id="hearth" width={30} height={30}/>
    </IconButton>
  )
}

export default AddToFavorite
