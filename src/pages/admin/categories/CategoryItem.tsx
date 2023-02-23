import React from 'react'

import IconButton from '@mui/material/IconButton'

import Svg from '../../../components/Svg'
import { Category } from '../../../contexts/productsFilters/types'
import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import StyledModal from '../../../components/StyledModal/StyledModal'
import EditCategoryForm from './EditCategoryForm'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'

type Props = {
  category: Category
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  const { deleteCategory, getCategories } = useProductsFilters()

  const handleDeleteCategory = () => {
    deleteCategory(category.id)
      .then(() => {
        getCategories()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      {category.name}

      <StyledModal
        icon={
          <IconButton type="button" sx={{ p: '6px' }}>
            <Svg id="pencil" width={30} height={30} />
          </IconButton>
        }
        title="Редактировать категорию"
      >
        <EditCategoryForm record={category} />
      </StyledModal>

      <StyledDialog
        icon={
          <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
            <Svg id="trash" width={30} height={30} />
          </IconButton>
        }
        title="Удалить категорию"
        text="Вы точно хотите удалить категорию?"
        handleSubmit={handleDeleteCategory}
      />
    </div>
  )
}

export default CategoryItem
