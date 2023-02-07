import React from 'react'
import './styles.scss'
import CheckoutForm from './CheckoutForm'

const CheckoutPage: React.FC = () => {
  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-content">
          <CheckoutForm />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
