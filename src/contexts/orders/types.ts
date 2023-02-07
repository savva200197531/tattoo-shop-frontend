export type CreateOrderPayload = {
  price: number
  return_url: string
  description: string
  product_id: number
}

export type CreateOrder = (payload: CreateOrderPayload) => Promise<any>

export type OrdersContextProps = {
  createOrder: CreateOrder
}
