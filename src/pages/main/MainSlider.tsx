import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useSlider } from '../../contexts/slider/SliderContext'
import Spinner from '../../components/Spinner/Spinner'
import SlideLayout from '../../components/SlideLayout/SlideLayout'
import { IconButton } from '@mui/material'
import Svg from '../../components/Svg/Svg'

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
      <Carousel
        renderArrowNext={(clickHandler, hasNext) => (
          hasNext && <IconButton
            className="slider-arrow slider-arrow__next"
            onClick={clickHandler}
            type="button"
            color="secondary"
            sx={{ p: '0' }}
          >
            <Svg className="slider-arrow__img" id="slider-arrow"/>
          </IconButton>
        )}
        renderArrowPrev={(clickHandler, hasPrev) => (
          hasPrev && <IconButton
            className="slider-arrow slider-arrow__prev"
            onClick={clickHandler}
            type="button"
            color="secondary"
            sx={{ p: '0' }}
          >
            <Svg className="slider-arrow__img" id="slider-arrow"/>
          </IconButton>
        )}
        className="main-slider"
        showThumbs={false}
        showArrows={true}
        showStatus={false}
      >
        {slides.map((slide) => <SlideLayout key={slide.id} slide={slide} />)}
      </Carousel>
    )
  )
}

export default MainSlider
