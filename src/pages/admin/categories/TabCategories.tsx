import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'

import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import Spinner from '../../../components/Spinner/Spinner'
import CategoryItem from './CategoryItem'
import CreateCategoryForm from './CreateCategoryForm'
import StyledModal from '../../../components/StyledModal/StyledModal'

const TabCategories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { categories, getCategories } = useProductsFilters()

  useEffect(() => {
    setLoading(true)

    getCategories().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      {loading ? <Spinner/> : (
        <div className="categories-list">{categories.map(category => <CategoryItem key={category.id} category={category}/>)}</div>
      )}

      <StyledModal
        icon={
          <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary">
            <AddIcon/>
          </Fab>
        }
        title="Создать категорию"
      >
        <CreateCategoryForm />
      </StyledModal>
    </>
  )
}

export default TabCategories
