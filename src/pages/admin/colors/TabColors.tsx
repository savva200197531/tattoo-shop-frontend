import React, { useEffect, useState } from 'react'

import Spinner from '../../../components/Spinner/Spinner'
import ColorsItem from './ColorsItem'
import StyledModal from '../../../components/StyledModal/StyledModal'
import ColorsForm, { ColorInput } from './ColorsForm'
import CreateButton from '../CreateButton'
import './styles.scss'
import { Color } from '../../../contexts/productsFilters/ColorsContext/types'
import { useColors } from '../../../contexts/productsFilters/ColorsContext/ColorsContext'

const TabColors: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [colors, setColors] = useState<Color[]>([])

  const { getColors, createColor } = useColors()

  const handleSubmit = (data: ColorInput) => {
    return createColor(data)
      .then(() => loadColors())
      .catch(error => {
        console.log(error)
      })
  }

  const loadColors = () => {
    setLoading(true)

    getColors()
      .then(data => setColors(data))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadColors()
  }, [])

  return (
    <>
      <StyledModal
        icon={<CreateButton />}
        title="Создать цвет"
      >
        {() => <ColorsForm onSubmit={handleSubmit} title="Создать цвет" buttonTitle="Создать"/>}
      </StyledModal>

      {loading ? <Spinner/> : (
        <div className="base-admin-items">{colors.map(color => <ColorsItem key={color.id} color={color} loadColors={loadColors} />)}</div>
      )}
    </>
  )
}

export default TabColors
