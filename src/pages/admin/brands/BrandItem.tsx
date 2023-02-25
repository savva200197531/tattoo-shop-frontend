import React from 'react'

import IconButton from '@mui/material/IconButton'

import Svg from '../../../components/Svg'
import { Brand } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import BrandForm, { BrandInput } from './BrandForm'

type Props = {
  brand: Brand
  loadBrands: () => void
}

const BrandItem: React.FC<Props> = ({ brand, loadBrands }) => {
  const { deleteBrand, editBrand } = useProductsFilters()

  const handleSubmit = (data: BrandInput) => {
    return editBrand(brand.id, data)
      .then(() => loadBrands())
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteBrand = () => {
    deleteBrand(brand.id)
      .then(() => loadBrands())
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="brand">
      {brand.name}

      <StyledModal
        icon={
          <IconButton type="button" sx={{ p: '6px' }}>
            <Svg id="pencil" width={30} height={30}/>
          </IconButton>
        }
        title="Редактировать бренд"
      >
        <BrandForm record={brand} onSubmit={handleSubmit} title="Редактировать бренд" buttonTitle="Сохранить"/>
      </StyledModal>

      <StyledDialog
        icon={
          <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
            <Svg id="trash" width={30} height={30}/>
          </IconButton>
        }
        title="Удалить бренд"
        text="Вы точно хотите удалить бренд?"
        handleSubmit={handleDeleteBrand}
      />
    </div>
  )
}

export default BrandItem
