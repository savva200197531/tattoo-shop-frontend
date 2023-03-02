import React, { useEffect, useState } from 'react'

import { useProductsFilters } from '../../../contexts/productsFilters/ProductsFiltersContext'
import Spinner from '../../../components/Spinner/Spinner'
import BrandItem from './BrandItem'
import StyledModal from '../../../components/StyledModal/StyledModal'
import { Brand } from '../../../contexts/productsFilters/types'
import BrandForm, { BrandInput } from './BrandForm'
import CreateButton from '../CreateButton'
import './styles.scss'

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
      <StyledModal
        icon={<CreateButton />}
        title="Создать бренд"
      >
        <BrandForm onSubmit={handleSubmit} title="Создать бренд" buttonTitle="Создать"/>
      </StyledModal>

      {loading ? <Spinner/> : (
        <div className="brands-list">{brands.map(brand => <BrandItem key={brand.id} brand={brand} loadBrands={loadBrands} />)}</div>
      )}
    </>
  )
}

export default TabBrands
