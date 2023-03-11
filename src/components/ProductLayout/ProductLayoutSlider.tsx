import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-img.png'
import classNames from 'classnames'
import ProductLayoutSlide from './ProductLayoutSlide'

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
