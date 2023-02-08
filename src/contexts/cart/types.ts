import { User } from '../auth/types'
import { Product } from '../products/types'

export type CartItem = {
  id: number
  count: number
  product: Product
  user: User
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

export type AddToCartPayload = {
  user_id: number
  product_id: number
  count: number
}

export type AddToCart = (payload: AddToCartPayload) => Promise<any>

export type GetCartItems = (user_id: number) => Promise<any>

export type DeleteFromCart = (id: number) => Promise<any>

export type CartContextProps = {
  cartItems: CartItem[]
  getCartItems: GetCartItems
  addToCart: AddToCart
  getCartItemsCount: () => number
  deleteFromCart: DeleteFromCart
  getTotalPrice: () => number
}
