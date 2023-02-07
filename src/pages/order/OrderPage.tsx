import React from 'react'
import './styles.scss'
import AddressInput from '../../components/AddressInput/AddressInput'

const OrderPage = () => {
  return (
    <div className="order">
      <div className="container">
        <div className="order-content">
          <AddressInput />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
