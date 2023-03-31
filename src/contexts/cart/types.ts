import { User } from '../auth/types'
import { Product } from '../products/types'

export type Cart = {
  totalPrice: number
  totalProductsCount: number
  items: CartItem[]
}

export type CartItem = {
  id: number
  count: number
  product: Product
  user?: User
  price: number
}

// export type AddCartItemPayload = {
//   product_id: number
//   count: number
// }
//
// export type AddCartItem = (payload: AddCartItemPayload) => Promise<any>

// export type RemoveCartItemPayload = AddCartItemPayload & {
//   cart_item_id: number
// }
//
// export type RemoveCartItem = (payload: RemoveCartItemPayload) => Promise<any>

export type FindCartItemByProductId = (product_id: CartItem['id']) => CartItem | undefined

export type AddToCartPayload = {
  user_id: number
  product_id: number
  count: number
}

export type GetCartItems = (user_id: number) => Promise<any>

export type AddToCart = (payload: AddToCartPayload) => Promise<any>

export type DeleteFromCart = (id: number) => Promise<any>

export type AddToLocalCartPayload = {
  product: Product
  count: number
}

export type GetLocalCartItems = () => void

export type AddToLocalCart = (payload: AddToLocalCartPayload) => void

export type DeleteFromLocalCart = (id: number) => void

export type CartContextProps = {
  cart: Cart
  getCartItems: GetCartItems
  addToCart: AddToCart
  deleteFromCart: DeleteFromCart
  getLocalCartItems: GetLocalCartItems
  addToLocalCart: AddToLocalCart
  deleteFromLocalCart: DeleteFromLocalCart
  findCartItemByProductId: FindCartItemByProductId
  loading: boolean
}
