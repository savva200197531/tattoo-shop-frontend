import React, { useEffect, useState } from 'react'

import { useMediaQuery } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import './styles.scss'
import Svg from '../Svg/Svg'
import FiltersForm from './FiltersForm'
import { Product } from '../../contexts/products/types'

type Props = {
  products: Product[]
}

const Filters: React.FC<Props> = ({ products }) => {
  const [open, setOpen] = useState(false)

  const mobile = useMediaQuery('(max-width:750px)')

  const handleOpen = () => {
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    return () => {
      handleClose()
    }
  }, [])

  return (
    <div className="filters">
      {mobile && (
        <div className="filters-mobile__header">
          <IconButton className="filters-button" onClick={handleOpen} type="submit" sx={{ p: '6px' }} aria-label="search">
            <Svg id="filter" className="filter-icon"/>
          </IconButton>
        </div>
      )}

      {mobile ? (
        open && <FiltersForm products={products} mobile={mobile} handleClose={handleClose} />
      ) : (
        <FiltersForm products={products} mobile={mobile} />
      )}
    </div>
  )
}

export default Filters
