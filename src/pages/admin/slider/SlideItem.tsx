import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Slide } from '../../../contexts/slider/types'
import Svg from '../../../components/Svg'
import SlideLayout from '../../../components/SlideLayout/SlideLayout'
import { useSlider } from '../../../contexts/slider/SliderContext'
import StyledModal from '../../../components/StyledModal/StyledModal'
import EditSlideForm from './EditSlideForm'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'

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
        <StyledModal
          icon={
            <IconButton type="button" sx={{ p: '6px' }}>
              <Svg id="pencil" width={30} height={30} />
            </IconButton>
          }
          title="Редактировать слайд"
        >
          <EditSlideForm record={slide} />
        </StyledModal>

        <StyledDialog
          title="Удалить слайд"
          icon={
            <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
              <Svg id="trash" width={30} height={30} />
            </IconButton>
          }
          text="Вы точно хотите удалить слайд?"
          handleSubmit={handleDeleteSlide}
        />
      </div>
    </SlideLayout>
  )
}

export default SlideItem
