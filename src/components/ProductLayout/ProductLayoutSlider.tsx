import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-img.png'
import classNames from 'classnames'
import ProductLayoutSlide from './ProductLayoutSlide'
import { IconButton } from '@mui/material'
import Svg from '../Svg/Svg'

type Props = {
  ids: number[]
  onClick?: () => void
  className?: string
}

const ProductLayoutSlider: React.FC<Props> = ({ ids, onClick, className }) => {
  const getSlides = () => {
    const sliderImages: string[] = ids?.length ? ids.map(id => imgSrc(id as number)) : [emptyImg]

    return sliderImages.map((src, index) => <ProductLayoutSlide key={index} src={src}/>)
  }

  return (
    <div className={classNames('product-layout-slider__wrapper', className)}>
      <Carousel
        onClickItem={onClick}
        showStatus={false}
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
        className="product-layout-slider"
        showThumbs={false}
        showArrows={true}
      >
        {getSlides()}
      </Carousel>
    </div>
  )
}

export default ProductLayoutSlider
