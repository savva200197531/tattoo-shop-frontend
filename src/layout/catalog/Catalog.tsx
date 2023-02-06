import React, { useState } from 'react'
import { Button } from '@mui/material'
import './styles.scss'
import Hamburger from '../../components/Hamburger/Hamburger'

const Catalog: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="catalog">
      <Button color="secondary" onClick={() => setOpen(!open)} startIcon={<Hamburger isActive={open} />}>Каталог</Button>
    </div>
  )
}

export default Catalog
