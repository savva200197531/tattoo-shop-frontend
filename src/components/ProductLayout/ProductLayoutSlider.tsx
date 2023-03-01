import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'

type Props = {
  ids: number[]
  onClick: () => void
}

const ProductLayoutSlider: React.FC<Props> = ({ ids, onClick }) => {
  return (
    ids?.length ? (
      <Carousel onClickItem={onClick} showStatus={false} className="product-layout-slider" showThumbs={false} showArrows={true}>
        {ids.map(id => (
          <div className="product-layout-slide" key={id}>
            <img className="product-layout-slide__img" src={imgSrc(id as number)} alt=""/>
          </div>
        ))}
      </Carousel>
    ) : (
      <img className="product-layout-slide" onClick={onClick} src={emptyImg} alt=""/>
    )
  )
}

export default ProductLayoutSlider
