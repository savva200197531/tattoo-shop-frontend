import React from 'react'
import { Slide } from '../../../contexts/slider/types'
import EditSlide from './EditSlide'
import IconButton from '@mui/material/IconButton'
import Svg from '../../../components/Svg'
import SlideLayout from '../../../components/SlideLayout/SlideLayout'
import { useSlider } from '../../../contexts/slider/SliderContext'

type Props = {
  slide: Slide
}

const SlideItem: React.FC<Props> = ({ slide }) => {
  const { deleteSlide, getSlides } = useSlider()

  const handleDeleteSlide = () => {
    deleteSlide(slide.id)
      .then(() => {
        getSlides()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <SlideLayout slide={slide}>
      <div className="admin-slider__toolbar">
        <EditSlide slide={slide} />

        <IconButton className="product-item__delete" onClick={handleDeleteSlide} type="button" sx={{ p: '6px' }}>
          <Svg id="trash" width={30} height={30} />
        </IconButton>
      </div>
    </SlideLayout>
  )
}

export default SlideItem
