export declare type IPaymentMethodType = 'bank_card' | 'apple_pay' | 'google_pay' | 'yoo_money' | 'qiwi' | 'webmoney' | 'sberbank' | 'alfabank' | 'tinkoff_bank' | 'b2b_sberbank' | 'sbp' | 'mobile_balance' | 'cash' | 'installments';

export type CreateOrderPayload = {
  price: number
  // return_url: string
  user_id: number
  surname: string
  name: string
  lastname: string
  email: string
  phone: string
  region: string
  city: string
  address: string
  comment?: string
  payment_method: IPaymentMethodType
}

export type CreateOrder = (payload: CreateOrderPayload) => Promise<any>

export type OrdersContextProps = {
  createOrder: CreateOrder
}
