import React from 'react'

import IconButton from '@mui/material/IconButton'

import Svg from '../../../components/Svg/Svg'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import ColorsForm, { ColorInput } from './ColorsForm'
import { useColors } from '../../../contexts/productsFilters/ColorsContext/ColorsContext'
import { Color } from '../../../contexts/productsFilters/ColorsContext/types'
import ColorLabel from '../../../components/ColorLabel/ColorLabel'

type Props = {
  color: Color
  loadColors: () => void
}

const ColorsItem: React.FC<Props> = ({ color, loadColors }) => {
  const { deleteColor, editColor } = useColors()

  const handleSubmit = (data: ColorInput) => {
    return editColor(color.id, data)
      .then(() => loadColors())
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteColor = () => {
    deleteColor(color.id)
      .then(() => loadColors())
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="base-admin-item">
      <ColorLabel color={color} />

      <StyledModal
        icon={
          <IconButton type="button" sx={{ p: '6px' }}>
            <Svg id="pencil" width={30} height={30}/>
          </IconButton>
        }
        title="Редактировать цвет"
      >
        <ColorsForm record={color} onSubmit={handleSubmit} title="Редактировать цвет" buttonTitle="Сохранить"/>
      </StyledModal>

      <StyledDialog
        icon={
          <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
            <Svg id="trash" width={30} height={30}/>
          </IconButton>
        }
        title="Удалить цвет"
        text="Вы точно хотите удалить цвет?"
        handleSubmit={handleDeleteColor}
      />
    </div>
  )
}

export default ColorsItem
