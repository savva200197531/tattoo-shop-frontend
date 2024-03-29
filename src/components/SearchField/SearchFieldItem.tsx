import React from 'react'
import { Product } from '../../contexts/products/types'
import { Link } from 'react-router-dom'
import emptyImg from '../../assets/images/empty-product-img.png'
import { imgSrc } from '../../helpers/imgSrc'

type Props = {
  product: Product
  handleClose: () => void
}

const SearchFieldItem: React.FC<Props> = ({ product, handleClose }) => {
  return (
    <Link onClick={handleClose} className="search-field__item" to={`/products/${product.id}`}>
      <img className="search-field__item-img" src={product.img_ids?.[0] ? imgSrc(product.img_ids[0]) : emptyImg} alt=""/>
      <div className="search-field__item-name">{product.name}</div>
    </Link>
  )
}

export default SearchFieldItem
