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
  'filter'

type Props = {
  className?: string
  id: SvgId | string
  width?: string | number
  height?: string | number
  fill?: string
  stroke?: string
  text?: string
}

const Svg: React.FC<Props> = ({ id, fill = 'black', text, ...rest }) => {
  return (
    <div className="svg">
      <svg fill={fill} {...rest}>
        <use fill={fill} xlinkHref={`${icons}#${id}`}/>
      </svg>
      {text && <p className="svg-text">{text}</p>}
    </div>
  )
}

export default Svg
