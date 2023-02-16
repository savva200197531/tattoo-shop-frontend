import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { useSlider } from '../../../contexts/slider/SliderContext'
import CreateSlide from './CreateSlide'
import SlideItem from './SlideItem'
import Spinner from '../../../components/Spinner/Spinner'

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
      {loading ? <Spinner /> : (
        <Carousel showStatus={false} className="main-slider admin-slider" showThumbs={false} showArrows={true}>
          {slides.map((slide) => <SlideItem key={slide.id} slide={slide} />)}
        </Carousel>
      )}

      <CreateSlide />
    </>
  )
}

export default TabSlider
