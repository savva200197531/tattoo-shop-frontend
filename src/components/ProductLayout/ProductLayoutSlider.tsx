import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'
import classNames from 'classnames'

type Props = {
  ids: number[]
  onClick?: () => void
  className?: string
}

const ProductLayoutSlider: React.FC<Props> = ({ ids, onClick, className }) => {
  return (
    <div className={classNames('product-layout-slider__wrapper', className)}>
      {ids?.length ? (
        <Carousel onClickItem={onClick} showStatus={false} className="product-layout-slider" showThumbs={false} showArrows={true}>
          {ids.map(id => (
            <div className="product-layout-slide" key={id}>
              <img className="product-layout-slide__img" src={imgSrc(id as number)} alt=""/>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="product-layout-slider">
          <img className="product-layout-slide__img" onClick={onClick} src={emptyImg} alt=""/>
        </div>
      )}
    </div>
  )
}

export default ProductLayoutSlider
