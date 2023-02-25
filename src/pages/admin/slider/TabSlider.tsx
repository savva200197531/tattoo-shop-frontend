import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { useSlider } from '../../../contexts/slider/SliderContext'
import SlideItem from './SlideItem'
import Spinner from '../../../components/Spinner/Spinner'
import StyledModal from '../../../components/StyledModal/StyledModal'
import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import CreateSlideForm, { SlideInput } from './SlideForm'
import { CreateSlidePayload } from '../../../contexts/slider/types'

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
      {loading ? <Spinner/> : (
        <Carousel showStatus={false} className="main-slider admin-slider" showThumbs={false} showArrows={true}>
          {slides.map((slide) => <SlideItem key={slide.id} slide={slide}/>)}
        </Carousel>
      )}

      <StyledModal
        icon={
          <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary" aria-label="add">
            <AddIcon/>
          </Fab>
        }
        title="Создать слайд"
      >
        <CreateSlideForm buttonTitle="Создать" title="Создать слайд" onSubmit={handleSubmit} />
      </StyledModal>
    </>
  )
}

export default TabSlider
