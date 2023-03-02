export const statusesVariable = {
  'payment.waiting_for_capture': 'В процессе',
  'payment.succeeded': 'Оплата прошла успешно',
}

export const orderStatusFormat = (status: keyof typeof statusesVariable): string => {
  return statusesVariable[status] || 'Не известен, обратитесь за помощью к администратору'
}
