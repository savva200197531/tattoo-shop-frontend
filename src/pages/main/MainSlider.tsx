import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useSlider } from '../../contexts/slider/SliderContext'
import Spinner from '../../components/Spinner/Spinner'
import SlideLayout from '../../components/SlideLayout/SlideLayout'

const MainSlider = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { slides, getSlides } = useSlider()

  useEffect(() => {
    setLoading(true)

    getSlides().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    loading ? <Spinner /> : (
      <Carousel className="main-slider" showThumbs={false} showArrows={true}>
        {slides.map((slide) => <SlideLayout key={slide.id} slide={slide} />)}
      </Carousel>
    )
  )
}

export default MainSlider
