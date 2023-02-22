import React from 'react'
import './styles.scss'
import { Slide } from '../../contexts/slider/types'
import { imgSrc } from '../../helpers/imgSrc'

type Props = {
  slide: Slide
  children?: React.ReactNode
}

const SlideLayout: React.FC<Props> = ({ slide, children }) => {
  const {} = slide

  return (
    <div className="slide-layout" style={{ backgroundImage: `url(${imgSrc(slide.img_id)})` }}>
      {children}
    </div>
  )
}

export default SlideLayout
