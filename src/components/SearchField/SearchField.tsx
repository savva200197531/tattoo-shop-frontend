import React, { useEffect, useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { ClickAwayListener } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

import Svg from '../Svg'
import Spinner from '../Spinner/Spinner'
import SearchFieldItem from './SearchFieldItem'
import { Product } from '../../contexts/products/types'
import { useProducts } from '../../contexts/products/ProductsContext'
import './style.scss'

const searchSchema = object({
  search: string(),
})

type SearchInput = TypeOf<typeof searchSchema>;

const SearchField: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { getProductsWithSearch } = useProducts()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const methods = useForm<SearchInput>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: searchParams.get('search') || '',
    },
  })

  const {
    register,
    handleSubmit,
    watch,
  } = methods

  const search = watch('search')

  const onSubmitHandler: SubmitHandler<SearchInput> = (data) => {
    navigate({
      pathname: '/products',
      search: createSearchParams({
        page: '1',
        limit: '10',
        search: data.search,
      }).toString(),
    })
  }

  const loadProducts = () => {
    setLoading(true)
    getProductsWithSearch(search)
      .then(data => {
        setProducts(data)
      })
      .finally(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const handleReset = () => {
  //   setProducts([])
  //   reset()
  // }

  useEffect(() => {
    if (search?.length) {
      handleOpen()
      loadProducts()
    } else {
      setProducts([])
    }
  }, [search])

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset()
  //   }
  // }, [isSubmitSuccessful, reset])

  useEffect(() => {

  }, [])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Paper
        component="form"
        className={classNames('search-field', { 'open': open })}
        sx={{ boxShadow: 'none' }}
        onFocus={handleOpen}
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        autoComplete="off"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Найти товары"
          {...register('search')}
        />
        {/*<IconButton type="reset" sx={{ p: '6px' }} aria-label="search">*/}
        {/*  <Svg id={'cross'} className="svg-cross"/>*/}
        {/*</IconButton>*/}
        <IconButton type="submit" sx={{ p: '6px' }} aria-label="search">
          <Svg id="search" className="svg-search"/>
        </IconButton>
        {open && (
          <div className="search-field__container">
            <div className="search-field__list">
              {loading ? <Spinner/> : (
                products.length ? products.map(product => <SearchFieldItem key={product.id} product={product}/>) :
                  <div className="search-field__empty">ничего не найдено</div>
              )}
            </div>
          </div>
        )}
      </Paper>
    </ClickAwayListener>
  )
}

export default SearchField
