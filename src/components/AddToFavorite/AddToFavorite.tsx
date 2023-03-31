import React from 'react'

import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material'

import { AddToFavoritePayload } from '../../contexts/favorite/types'
import { useFavorite } from '../../contexts/favorite/FavoriteContext'
import Svg from '../Svg/Svg'
import { useAuth } from '../../contexts/auth/AuthContext'
import { useAlert } from '../../contexts/alert/AlertContext'
import { ShowAlertPayload } from '../../contexts/alert/types'

type Props = {
  product_id: number
  user_id: number
  isFavorite: boolean
}

const AddToFavorite: React.FC<Props> = ({ product_id, user_id, isFavorite }) => {
  const { addToFavorite } = useFavorite()
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

    return addToFavorite(payload)
  }

  return (
    <IconButton
      className="product-item__favorite"
      onClick={handleAddToFavorite}
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
