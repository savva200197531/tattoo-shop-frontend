import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const options = [
  {
    name: 'Обычная',
    value: 'id:DESC',
  },
  {
    name: 'Сначала новые',
    value: 'created_at:DESC',
  },
  {
    name: 'Сначала старые',
    value: 'created_at:ASC',
  },
  {
    name: 'Сначала дорогие',
    value: 'price:DESC',
  },
  {
    name: 'Сначала дешевые',
    value: 'price:ASC',
  },
]

const ProductsHeader: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: SelectChangeEvent) => {
    searchParams.set('sort', event.target.value)
    setSearchParams(searchParams)
  }

  return (
    <div className="products-header">
      <Typography variant='h4' component='h1' fontWeight={500} textAlign="center">
        Товары
      </Typography>

      <FormControl style={{ marginLeft: 'auto' }} sx={{ m: 1, minWidth: 200 }} size="medium">
        <InputLabel id="demo-select-small">Сортировка</InputLabel>
        <Select
          value={searchParams.get('sort') || options[0].value}
          label="Сортировка"
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default ProductsHeader
