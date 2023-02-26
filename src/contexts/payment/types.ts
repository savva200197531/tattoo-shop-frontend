export type Payment = {
  confirmation: {
    confirmation_url: string
  }
}

export type CreatePaymentPayload = {
  price: number
  return_url: string
  description: string
}

export type CreatePayment = (payload: CreatePaymentPayload) => Promise<any>

export type PaymentContextProps = {
  createPayment: CreatePayment
}
