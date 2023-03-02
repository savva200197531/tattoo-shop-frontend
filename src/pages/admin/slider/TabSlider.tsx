import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { useSlider } from '../../../contexts/slider/SliderContext'
import SlideItem from './SlideItem'
import Spinner from '../../../components/Spinner/Spinner'
import StyledModal from '../../../components/StyledModal/StyledModal'
import CreateSlideForm, { SlideInput } from './SlideForm'
import { CreateSlidePayload } from '../../../contexts/slider/types'
import CreateButton from '../CreateButton'

const TabSlider: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { slides, getSlides, createSlide } = useSlider()

  const handleSubmit = (data: SlideInput) => {
    const payload: CreateSlidePayload = {
      link: data.link,
      img_id: data.img_ids[0],
    }

    return createSlide(payload)
      .catch(error => {
        console.log(error)
      })
  }

  const loadSlides = () => {
    setLoading(true)

    getSlides().finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    loadSlides()
  }, [])

  return (
    <>
      <StyledModal
        icon={<CreateButton />}
        title="Создать слайд"
      >
        <CreateSlideForm buttonTitle="Создать" title="Создать слайд" onSubmit={handleSubmit} />
      </StyledModal>

      {loading ? <Spinner/> : (
        <Carousel showStatus={false} className="main-slider admin-slider" showThumbs={false} showArrows={true}>
          {slides.map((slide) => <SlideItem key={slide.id} slide={slide}/>)}
        </Carousel>
      )}
    </>
  )
}

export default TabSlider
