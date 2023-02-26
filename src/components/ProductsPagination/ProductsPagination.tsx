import React from 'react'
import { Pagination, Stack } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import './styles.scss'

type Props = {
  count: number
  page: number
}

const ProductsPagination: React.FC<Props> = ({ count, page }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set('page', value.toString())
    setSearchParams(searchParams)
  }

  return (
    <Stack spacing={2} className="products-pagination" sx={{ mt: 4, mb: 2 }}>
      <Pagination
        count={count}
        showFirstButton
        showLastButton
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  )
}

export default ProductsPagination
