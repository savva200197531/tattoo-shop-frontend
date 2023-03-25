import React from 'react'
import './styles.scss'

type Props = {
  color: string
}

const ColorBadge: React.FC<Props> = ({ color }) => {
  return <div className="color-label__badge" style={{ background: color }} />
}

export default ColorBadge
