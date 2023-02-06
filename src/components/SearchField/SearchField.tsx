import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Svg from '../Svg'
import './style.scss'

const SearchField = () => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '38px', border: '1px solid black', boxShadow: 'none' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Найти товары"
      />
      <IconButton type="button" sx={{ p: '6px' }} aria-label="search">
        <Svg id="search" className="svg-search" />
      </IconButton>
    </Paper>
  )
}

export default SearchField
