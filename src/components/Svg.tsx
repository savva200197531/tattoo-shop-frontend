import React from 'react'
import icons from '../assets/images/icons.svg'

export type SvgId =
  'burger' |
  'cart' |
  'hearth' |
  'instagram' |
  'profile' |
  'phone' |
  'search' |
  'telegram' |
  'trash'

type Props = {
  className?: string
  id: SvgId | string
  width?: string | number
  height?: string | number
}

const Svg: React.FC<Props> = ({ id, ...rest }) => {
  return (
    <svg {...rest}>
      <use xlinkHref={`${icons}#${id}`}/>
    </svg>
  )
}

export default Svg
