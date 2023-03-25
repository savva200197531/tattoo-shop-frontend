import React from 'react'
import './styles.scss'
import Svg from '../Svg/Svg'

type Props = {
  count: number
}

const InStock: React.FC<Props> = ({ count }) => {
  const inStock = count > 0

  return (
    <div className="in-stock">
      {inStock ? 'В наличии' : 'Нет в наличии'}
      {inStock && <Svg className="in-stock__icon" id="checkmark" />}
    </div>
  )
}

export default InStock
