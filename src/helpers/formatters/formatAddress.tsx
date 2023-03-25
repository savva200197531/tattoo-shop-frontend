import { Order } from '../../contexts/orders/types'

export const formatAddress = (order: Order) => `${order.region}, ${order.city}, ${order.street} ${order.house}, ${order.apartment}`
