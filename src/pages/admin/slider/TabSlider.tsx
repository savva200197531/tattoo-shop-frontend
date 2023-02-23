import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { useSlider } from '../../../contexts/slider/SliderContext'
import SlideItem from './SlideItem'
import Spinner from '../../../components/Spinner/Spinner'
import StyledModal from '../../../components/StyledModal/StyledModal'
import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import CreateSlideForm from './CreateSlideForm'

const TabSlider: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { slides, getSlides } = useSlider()

  useEffect(() => {
    setLoading(true)

    getSlides().finally(() => {
      setLoading(false)
    })
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
        <CreateSlideForm/>
      </StyledModal>
    </>
  )
}

export default TabSlider
