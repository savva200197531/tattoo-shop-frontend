import React from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ProductForm, { ProductInput } from './ProductForm'
import StyledModal from '../../../components/StyledModal/StyledModal'
import { useProducts } from '../../../contexts/products/ProductsContext'

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
      icon={
        <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary" aria-label="add">
          <AddIcon/>
        </Fab>
      }
    >
      <ProductForm buttonTitle="Создать" title="Создать товар" onSubmit={handleSubmit}/>
    </StyledModal>
  )
}

export default CreateProduct
