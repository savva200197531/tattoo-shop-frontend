import { OrderStatus } from '../../contexts/orders/types'

export const statusesVariable = {
  1: 'Ожидает оплаты',
  2: 'Оплачен',
  3: 'Отправлен',
  4: 'У покупателя',
}

export const formatOrderStatus = (status: OrderStatus): string => {
  return statusesVariable[status] || 'Не известен, обратитесь за помощью к администратору'
}
