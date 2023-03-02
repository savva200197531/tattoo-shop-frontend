import React from 'react'

import IconButton from '@mui/material/IconButton'

import { EditSlidePayload, Slide } from '../../../contexts/slider/types'
import Svg from '../../../components/Svg/Svg'
import SlideLayout from '../../../components/SlideLayout/SlideLayout'
import { useSlider } from '../../../contexts/slider/SliderContext'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import SlideForm, { SlideInput } from './SlideForm'

type Props = {
  slide: Slide
}

const SlideItem: React.FC<Props> = ({ slide }) => {
  const { deleteSlide, getSlides, editSlide } = useSlider()

  const handleDeleteSlide = () => {
    deleteSlide(slide.id)
      .then(() => getSlides())
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = (data: SlideInput) => {
    const payload: EditSlidePayload = {
      link: data.link,
      img_id: data.img_ids[0],
    }

    return editSlide(slide.id, payload)
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <SlideLayout slide={slide}>
      <div className="admin-slider__toolbar bordered-box">
        <StyledModal
          icon={
            <IconButton type="button" sx={{ p: '6px' }}>
              <Svg id="pencil" width={30} height={30}/>
            </IconButton>
          }
          title="Редактировать слайд"
        >
          <SlideForm record={slide} buttonTitle="Сохранить" title="Редактировать слайд" onSubmit={handleSubmit}/>
        </StyledModal>

        <StyledDialog
          title="Удалить слайд"
          icon={
            <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
              <Svg id="trash" width={30} height={30}/>
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
