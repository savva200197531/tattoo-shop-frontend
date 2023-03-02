import React from 'react'

import ProductForm, { ProductInput } from './ProductForm'
import StyledModal from '../../../components/StyledModal/StyledModal'
import { useProducts } from '../../../contexts/products/ProductsContext'
import CreateButton from '../CreateButton'

type Props = {
  loadProducts: () => void
}

const CreateProduct: React.FC<Props> = ({ loadProducts }) => {
  const { createProduct } = useProducts()

  const handleSubmit = (data: ProductInput) => {
    return createProduct(data)
      .then(() => loadProducts())
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <StyledModal
      title="Создать товар"
      icon={<CreateButton />}
    >
      <ProductForm buttonTitle="Создать" title="Создать товар" onSubmit={handleSubmit}/>
    </StyledModal>
  )
}

export default CreateProduct
