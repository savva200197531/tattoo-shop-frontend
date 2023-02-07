import React from 'react'
import { usePayment } from '../../contexts/payment/PaymentContext'

const PaymentSuccess: React.FC = () => {
  const {} = usePayment()

  return (
    <div className="payment-success">
      <div className="container">
        <div className="payment-success-content">
          Оплата проведена успешно
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
