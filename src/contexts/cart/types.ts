import { FullUser } from '../auth/types'

export type CartItem = {
  id: number
  count: number
  product_id: number
  user: FullUser
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

export type CartContextProps = {
  cartItems: CartItem[]
  getCartItems: GetCartItems
  addToCart: AddToCart
}
