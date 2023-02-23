import React, { useEffect, useState } from 'react'

import Spinner from '../../../components/Spinner/Spinner'
import ProductItem from './ProductItem'
import { useProducts } from '../../../contexts/products/ProductsContext'
import StyledModal from '../../../components/StyledModal/StyledModal'
import CreateProductForm from './CreateProductForm'
import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'

const TabProducts = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { products, getProducts } = useProducts()

  useEffect(() => {
    setLoading(true)

    getProducts().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="products-list admin-products-list">
      {loading ? <Spinner/> : products.map(product => <ProductItem key={product.id} product={product}/>)}

      <StyledModal
        title="Создать товар"
        icon={
          <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        }
      >
        <CreateProductForm />
      </StyledModal>
    </div>
  )
}

export default TabProducts
