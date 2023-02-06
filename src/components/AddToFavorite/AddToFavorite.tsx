import React from 'react'
import { CartItem } from '../../contexts/cart/types'
import { AddToFavoritePayload } from '../../contexts/favorite/types'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'
import Svg from '../Svg'
import IconButton from '@mui/material/IconButton'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useAlert } from '../../contexts/alert/AlertContext'
import { ShowAlertPayload } from '../../contexts/alert/types'
import { useTheme } from '@mui/material'

type Props = {
  product_id: number
  user_id: number
  onSubmit: (promise: Promise<CartItem>) => void
  isFavorite: boolean
  id?: number
}

const AddToFavorite: React.FC<Props> = ({ product_id, onSubmit, user_id, isFavorite, id }) => {
  const { addToFavorite, deleteFromFavorite } = useFavorite()
  const { isUserExist } = useAuth()
  const { showAlert } = useAlert()
  const theme = useTheme()

  const handleAddToFavorite = () => {
    if (!isUserExist) {
      const payload: ShowAlertPayload = {
        text: 'Невозможно добавить в избранное, зарегистрируйтесь',
        severity: 'warning',
      }

      return showAlert(payload)
    }

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
      className="product-item__favorite"
      onClick={() => {
        isFavorite ? handleDeleteFromFavorite() : handleAddToFavorite()
      }}
      type="button"
      sx={{ p: '6px' }}
    >
      <Svg
        stroke={isFavorite ? theme.palette.primary.main : 'black'}
        fill={isFavorite ? theme.palette.primary.main : 'none'}
        id="hearth"
        width={30}
        height={30}
      />
    </IconButton>
  )
}

export default AddToFavorite
