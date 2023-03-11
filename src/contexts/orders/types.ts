import { Product } from '../products/types'
import { User } from '../auth/types'
import { CartItem } from '../cart/types'

export type OrderStatus = 1 | 2 | 3 | 4

export type Order = {
  id: number
  price: number
  phone: string
  address: string
  surname: string
  name: string
  lastname: string
  email: string
  region: string
  city: string
  comment: string
  status: OrderStatus
  date: string
  user: User
  products: Product[]
}

export type CreateOrderPayload = {
  price: number
  user_id?: number
  surname: string
  name: string
  lastname: string
  email: string
  phone: string
  region: string
  city: string
  address: string
  status: OrderStatus
  comment?: string
  cart: CartItem[]
}

export type CreateOrder = (payload: CreateOrderPayload) => Promise<any>

export type GetOrders = (user_id: number) => Promise<Order[]>

export type GetOrder = (id: number, user_id: number) => Promise<Order>

export type GetAllOrders = () => Promise<Order[]>

export type OrdersContextProps = {
  createOrder: CreateOrder
  getOrders: GetOrders
  getOrder: GetOrder
  getAllOrders: GetAllOrders
}
