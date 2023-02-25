import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Svg from '../Svg'
import './style.scss'
import { Button } from '@mui/material'

const SearchField = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('123')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <Paper
      component="form"
      className="search-field"
      onFocus={handleOpen}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Найти товары"
        onChange={handleChange}
        value={value}
      />
      <IconButton type="button" sx={{ p: '6px' }} aria-label="search">
        <Svg id="search" className="svg-search" />
      </IconButton>
      {open && (
        <div className="search-field__container">
          <div className="search-field__list">
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
          </div>

          <div className="search-field__toolbar">
            <div>all</div>

            <Button onClick={handleClose}>close</Button>
          </div>
        </div>
      )}
    </Paper>
  )
}

export default SearchField
