import React from 'react'
import './styles.scss'
import { StyledButton } from '../../components/StyledButtons'
import { usePayment } from '../../contexts/payment/PaymentContext'
import { CreatePaymentPayload } from '../../contexts/payment/types'

const PaymentPage: React.FC = () => {
  const { createPayment } = usePayment()

  const handleCreatePayment = () => {
    // const payload: CreatePaymentPayload = {
    //   price,
    // }

    // createPayment(payload)
  }

  return (
    <div className="payment">
      <div className="container">
        <div className="payment-content">
          <StyledButton onClick={handleCreatePayment}>Оплатить</StyledButton>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
