import React from 'react'
import { Product } from '../../contexts/products/types'
import { imgSrc } from '../../helpers/imgSrc'
import emptyImg from '../../assets/images/empty-product-image.svg'
import { Link } from 'react-router-dom'

type Props = {
  product: Product
}

const SearchFieldItem: React.FC<Props> = ({ product }) => {
  return (
    <Link className="search-field__item" to={`/products/${product.id}`}>
      <img className="search-field__item-img" src={product.img_ids?.[0] ? imgSrc(product.img_ids[0]) : emptyImg} alt=""/>
      <div className="search-field__item-name">{product.name}</div>
    </Link>
  )
}

export default SearchFieldItem
