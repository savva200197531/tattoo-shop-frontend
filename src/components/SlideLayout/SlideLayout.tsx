import React from 'react'

import { Slide } from '../../contexts/slider/types'
import { imgSrc } from '../../helpers/imgSrc'
import './styles.scss'

type Props = {
  slide: Slide
  children?: React.ReactNode
}

const SlideLayout: React.FC<Props> = ({ slide, children }) => {
  const { img_id, link } = slide

  const onClick = () => {
    if (!link) return
    window.open(link, '_blank')
  }

  return (
    <div className="slide-layout" onClick={onClick} style={{ backgroundImage: `url(${imgSrc(img_id)})` }}>
      {children}
    </div>
  )
}

export default SlideLayout
