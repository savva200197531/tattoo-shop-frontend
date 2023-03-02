import React, { useState } from 'react'
import './styles.scss'
import { useMediaQuery } from '@mui/material'
import Svg from '../Svg/Svg'
import IconButton from '@mui/material/IconButton'
import FiltersForm from './FiltersForm'

const Filters: React.FC = () => {
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
        open && <FiltersForm mobile={mobile} handleClose={handleClose} />
      ) : (
        <FiltersForm mobile={mobile} />
      )}
    </div>
  )
}

export default Filters
