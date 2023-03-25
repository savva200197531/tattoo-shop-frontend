import React, { useEffect, useState } from 'react'

import Spinner from '../../../components/Spinner/Spinner'
import BrandItem from './BrandItem'
import StyledModal from '../../../components/StyledModal/StyledModal'
import BrandForm, { BrandInput } from './BrandForm'
import CreateButton from '../CreateButton'
import './styles.scss'
import { Brand } from '../../../contexts/productsFilters/BrandsContext/types'
import { useBrands } from '../../../contexts/productsFilters/BrandsContext/BrandsContext'

const TabBrands: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])

  const { getBrands, createBrand } = useBrands()

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
        <div className="base-admin-items">{brands.map(brand => <BrandItem key={brand.id} brand={brand} loadBrands={loadBrands} />)}</div>
      )}
    </>
  )
}

export default TabBrands
