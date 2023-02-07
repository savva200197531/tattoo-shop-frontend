export type CreatePaymentPayload = {
  price: number
  return_url: string
  description: string
  product_id: number
}

export type CreatePayment = (payload: CreatePaymentPayload) => Promise<any>

export type PaymentContextProps = {
  createPayment: CreatePayment
}
