import React from 'react'

import IconButton from '@mui/material/IconButton'

import { Product } from '../../../contexts/products/types'
import { useProducts } from '../../../contexts/products/ProductsContext'
import Svg from '../../../components/Svg/Svg'
import { useAuth } from '../../../contexts/auth/AuthContext'
import ProductLayout from '../../../components/ProductLayout/ProductLayout'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import StyledModal from '../../../components/StyledModal/StyledModal'
import ProductForm, { ProductInput } from './ProductForm'

type Props = {
  product: Product
  loadProducts: () => void
}

const ProductItem: React.FC<Props> = ({ product, loadProducts }) => {
  const { deleteProduct, editProduct } = useProducts()
  const { getUser, user } = useAuth()

  const handleSubmit = (data: ProductInput) => {
    return editProduct(product.id, data)
      .then(() => loadProducts())
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteProduct = () => {
    deleteProduct(product.id)
      .then(() => {
        loadProducts()
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
                <Svg id="pencil" width={30} height={30}/>
              </IconButton>
            }
            title="Редактировать товар"
          >
            <ProductForm record={product} onSubmit={handleSubmit} title="Редактировать товар" buttonTitle="Сохранить"/>
          </StyledModal>

          <StyledDialog
            title="Удалить товар"
            icon={
              <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
                <Svg id="trash" width={30} height={30}/>
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
