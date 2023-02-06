import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Carousel } from 'react-responsive-carousel'
import { Typography } from '@mui/material'
import Spinner from '../../components/Spinner/Spinner'
import ProductItem from '../products/ProductItem'
import { useProducts } from '../../contexts/products/ProductsContext'

const slides = [
  {
    text: 'Слайд 1',
  },
  {
    text: 'Слайд 2',
  },
]

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { getProducts, products } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="main">
      <div className="container">
        <div className="main-content">
          <Carousel className="main-slider" showThumbs={false} showArrows={true}>
            {slides.map((slide, index) => (
              <div key={index} className="main-slide">
                {slide.text}
              </div>
            ))}
          </Carousel>

          <Typography variant='h4' component='h1' fontWeight={500} textAlign="center" sx={{ mt: '80px', mb: '60px' }}>
            Новинки
          </Typography>

          <div className="products-list">
            {loading ? <Spinner /> : (
              products.map(product => <ProductItem key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
