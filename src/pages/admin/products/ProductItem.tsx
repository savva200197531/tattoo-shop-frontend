import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Product } from '../../../contexts/products/types'
import { useProducts } from '../../../contexts/products/ProductsContext'
import Svg from '../../../components/Svg'
import { useAuth } from '../../../contexts/auth/AuthContext'
import ProductLayout from '../../../components/ProductLayout/ProductLayout'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import StyledModal from '../../../components/StyledModal/StyledModal'

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
          <StyledModal
            icon={
              <IconButton type="button" sx={{ p: '6px' }}>
                <Svg id="pencil" width={30} height={30} />
              </IconButton>
            }
            title="Редактировать товар"
          >
            <div>Редактировать товар</div>
          </StyledModal>

          <StyledDialog
            title="Удалить товар"
            icon={
              <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
                <Svg id="trash" width={30} height={30} />
              </IconButton>
            }
            text="Вы точно хотите удалить товар?"
            handleSubmit={handleDeleteProduct}
          />
        </>
      )}
    />
  )
}

export default ProductItem
