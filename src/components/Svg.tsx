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
  'trash' |
  'pencil'

type Props = {
  className?: string
  id: SvgId | string
  width?: string | number
  height?: string | number
  fill?: string
}

const Svg: React.FC<Props> = ({ id, fill = 'black', ...rest }) => {
  return (
    <svg fill={fill} {...rest}>
      <use fill={fill} xlinkHref={`${icons}#${id}`}/>
    </svg>
  )
}

export default Svg
