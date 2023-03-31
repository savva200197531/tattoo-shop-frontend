import React from 'react'

import IconButton from '@mui/material/IconButton'

import Svg from '../../../components/Svg/Svg'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import BrandForm, { BrandInput } from './BrandForm'
import { Brand } from '../../../contexts/productsFilters/BrandsContext/types'
import { useBrands } from '../../../contexts/productsFilters/BrandsContext/BrandsContext'
import { HandleClickEmpty } from '../../../types/types'

type Props = {
  brand: Brand
  loadBrands: () => void
}

const BrandItem: React.FC<Props> = ({ brand, loadBrands }) => {
  const { deleteBrand, editBrand } = useBrands()

  const handleSubmit = (data: BrandInput, handleClose: HandleClickEmpty) => {
    return editBrand(brand.id, data)
      .then(() => {
        loadBrands()
        handleClose()
      })
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
    <div className="base-admin-item">
      {brand.name}

      <StyledModal
        icon={
          <IconButton type="button" sx={{ p: '6px' }}>
            <Svg id="pencil" width={30} height={30}/>
          </IconButton>
        }
        title="Редактировать бренд"
      >
        {handleClose => (
          <BrandForm
            record={brand}
            onSubmit={data => handleSubmit(data, handleClose)}
            title="Редактировать бренд"
            buttonTitle="Сохранить"
          />
        )}
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
