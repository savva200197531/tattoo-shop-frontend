import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'

import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import Spinner from '../../../components/Spinner/Spinner'
import BrandItem from './BrandItem'
import StyledModal from '../../../components/StyledModal/StyledModal'
import { Brand } from '../../../contexts/productsFilters/types'
import BrandForm, { BrandInput } from './BrandForm'

const TabBrands: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])

  const { getBrands, createBrand } = useProductsFilters()

  const handleSubmit = (data: BrandInput) => {
    return createBrand(data)
      .then(() => loadBrands())
      .catch(error => {
        console.log(error)
      })
  }

  const loadBrands = () => {
    setLoading(true)

    getBrands()
      .then(data => setBrands(data))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadBrands()
  }, [])

  return (
    <>
      {loading ? <Spinner/> : (
        <div className="brands-list">{brands.map(brand => <BrandItem key={brand.id} brand={brand} loadBrands={loadBrands} />)}</div>
      )}

      <StyledModal
        icon={
          <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary">
            <AddIcon/>
          </Fab>
        }
        title="Создать бренд"
      >
        <BrandForm onSubmit={handleSubmit} title="Создать бренд" buttonTitle="Создать"/>
      </StyledModal>
    </>
  )
}

export default TabBrands
