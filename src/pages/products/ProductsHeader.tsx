import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

const ProductsHeader: React.FC = () => {
  const [sort, setSort] = useState<string>()

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value)
  }

  return (
    <div className="products-header">
      <Typography variant='h4' component='h1' fontWeight={500} textAlign="center">
        Товары
      </Typography>

      <FormControl style={{ marginLeft: 'auto' }} sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Age</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={sort}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default ProductsHeader
