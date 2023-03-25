import React from 'react'
import { Color } from '../../contexts/productsFilters/ColorsContext/types'
import './styles.scss'
import ColorBadge from './ColorBadge'

type Props = {
  color: Color
}

const ColorLabel: React.FC<Props> = ({ color }) => {
  return (
    <div className="color-label">
      <ColorBadge color={color.value} />
      <span>{color.name}</span>
    </div>
  )
}

export default ColorLabel
