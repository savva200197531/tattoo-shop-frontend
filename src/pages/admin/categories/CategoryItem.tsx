import React from 'react'

import IconButton from '@mui/material/IconButton'

import Svg from '../../../components/Svg/Svg'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import CategoryLayout from '../../../components/CategoryLayout/CategoryLayout'
import CategoryForm, { CategoryInput } from './CategoryForm'
import { Category, EditCategoryPayload } from '../../../contexts/productsFilters/CategoriesContext/types'
import { useCategories } from '../../../contexts/productsFilters/CategoriesContext/CategoriesContext'

type Props = {
  category: Category
  loadCategories: () => void
}

const CategoryItem: React.FC<Props> = ({ category, loadCategories }) => {
  const { deleteCategory, editCategory } = useCategories()

  const handleSubmit = (data: CategoryInput) => {
    console.log(data)
    const payload: EditCategoryPayload = {
      ...data,
      img_id: data.img_ids[0],
    }

    return editCategory(category.id, payload)
      .then(() => loadCategories())
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteCategory = () => {
    deleteCategory(category.id)
      .then(() => {
        loadCategories()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <CategoryLayout disabled category={category}>
      <div className="admin-category__toolbar">
        <StyledModal
          icon={
            <IconButton type="button" sx={{ p: '6px' }}>
              <Svg fill="white" id="pencil" width={30} height={30}/>
            </IconButton>
          }
          title="Редактировать категорию"
        >
          <CategoryForm
            record={category}
            onSubmit={handleSubmit}
            title="Редактировать категорию"
            buttonTitle="Сохранить"
          />
        </StyledModal>

        <StyledDialog
          icon={
            <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
              <Svg fill="white" id="trash" width={30} height={30}/>
            </IconButton>
          }
          title="Удалить категорию"
          text="Вы точно хотите удалить категорию?"
          handleSubmit={handleDeleteCategory}
        />
      </div>
    </CategoryLayout>
  )
}

export default CategoryItem
