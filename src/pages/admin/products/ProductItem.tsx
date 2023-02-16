import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Product } from '../../../contexts/products/types'
import { useProducts } from '../../../contexts/products/ProductsContext'
import Svg from '../../../components/Svg'
import EditProduct from './EditProduct'
import { useAuth } from '../../../contexts/auth/AuthContext'
import ProductLayout from '../../../components/ProductLayout/ProductLayout'

type Props = {
  product: Product
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { deleteProduct, getProducts } = useProducts()
  const { getUser, user } = useAuth()

  const handleDeleteProduct = () => {
    deleteProduct(product.id)
      .then(() => {
        getProducts()
        getUser(user.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <ProductLayout
      product={product}
      headerContent={(
        <>
          <EditProduct product={product} />

          <IconButton className="product-item__delete" onClick={handleDeleteProduct} type="button" sx={{ p: '6px' }}>
            <Svg id="trash" width={30} height={30} />
          </IconButton>
        </>
      )}
    />
  )
}

export default ProductItem
