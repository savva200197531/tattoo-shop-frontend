import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'

import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import Spinner from '../../../components/Spinner/Spinner'
import BrandItem from './BrandItem'
import CreateBrandForm from './CreateBrandForm'
import StyledModal from '../../../components/StyledModal/StyledModal'

const TabBrands: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { brands, getBrands } = useProductsFilters()

  useEffect(() => {
    setLoading(true)

    getBrands().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      {loading ? <Spinner/> : (
        <div className="brands-list">{brands.map(brand => <BrandItem key={brand.id} brand={brand}/>)}</div>
      )}

      <StyledModal
        icon={
          <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary">
            <AddIcon/>
          </Fab>
        }
        title="Создать бренд"
      >
        <CreateBrandForm />
      </StyledModal>
    </>
  )
}

export default TabBrands
