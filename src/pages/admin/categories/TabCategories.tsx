import React, { useEffect, useState } from 'react'

import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import Spinner from '../../../components/Spinner/Spinner'
import CategoryItem from './CategoryItem'
import CategoryForm, { CategoryInput } from './CategoryForm'
import StyledModal from '../../../components/StyledModal/StyledModal'
import { Category, CreateCategoryPayload } from '../../../contexts/productsFilters/types'
import CreateButton from '../CreateButton'
import './styles.scss'

const TabCategories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const { getCategories, createCategory } = useProductsFilters()

  const handleSubmit = (data: CategoryInput) => {
    const payload: CreateCategoryPayload = {
      name: data.name,
      img_id: data.img_ids[0],
    }

    return createCategory(payload)
      .then(() => loadCategories())
      .catch(error => {
        console.log(error)
      })
  }

  const loadCategories = () => {
    setLoading(true)

    getCategories()
      .then(data => setCategories(data))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <>
      <StyledModal
        icon={<CreateButton />}
        title="Создать категорию"
      >
        <CategoryForm onSubmit={handleSubmit} title="Создать категорию" buttonTitle="Создать"/>
      </StyledModal>

      {loading ? <Spinner/> : (
        <div className="categories-list">
          {categories.map(category => (
            <CategoryItem key={category.id} category={category} loadCategories={loadCategories}/>
          ))}
        </div>
      )}
    </>
  )
}

export default TabCategories
