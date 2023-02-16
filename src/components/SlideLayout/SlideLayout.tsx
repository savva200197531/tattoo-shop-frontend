import React from 'react'
import './styles.scss'
import { Slide } from '../../contexts/slider/types'
import { imgSrc } from '../../helpers/imgSrc'
import { Typography } from '@mui/material'

type Props = {
  slide: Slide
  children?: React.ReactNode
}

const SlideLayout: React.FC<Props> = ({ slide, children }) => {
  const { title, description, img_id, bg_color } = slide

  return (
    <div className="slide-layout" style={{ background: bg_color }}>
      <Typography variant='h6' component='h4' fontWeight={500}>
        {title}
      </Typography>
      <p className="slide-description">{description}</p>
      {img_id && <img className="slide-img" src={imgSrc(img_id)} alt=""/>}
      {children}
    </div>
  )
}

export default SlideLayout
