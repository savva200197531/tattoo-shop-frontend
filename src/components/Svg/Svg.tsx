import React from 'react'
import icons from '../../assets/images/icons.svg'
import './styles.scss'

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
  'pencil' |
  'cross' |
  'filter' |
  'checkmark' |
  'slider-arrow' |
  'menu' |
  'house'

type Props = {
  className?: string
  id: SvgId | string
  width?: string | number
  height?: string | number
  fill?: string
  stroke?: string
  text?: string
}

const Svg: React.FC<Props> = ({
  id,
  fill = 'black',
  text,
  className = 'base-icon',
  ...rest
}) => {
  return (
    <div className="svg">
      <svg fill={fill} className={className} {...rest}>
        <use fill={fill} xlinkHref={`${icons}#${id}`}/>
      </svg>
      {text && <p className="svg-text">{text}</p>}
    </div>
  )
}

export default Svg
