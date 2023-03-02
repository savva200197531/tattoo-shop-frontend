import React from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledButton } from './StyledButtons'

const CatalogButton = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center' }}>
      <StyledButton onClick={() => navigate('/catalog')}>Перейти в каталог</StyledButton>
    </div>
  )
}

export default CatalogButton
