import React from 'react'
import './styles.scss'
import Svg from '../../components/Svg'
import { Button } from '@mui/material'

const Catalog: React.FC = () => {
  return (
    <div className="catalog">
      <Button startIcon={<Svg id="burger" className="burger-icon" width={30} height={30} />}>Каталог</Button>
    </div>
  )
}

export default Catalog
