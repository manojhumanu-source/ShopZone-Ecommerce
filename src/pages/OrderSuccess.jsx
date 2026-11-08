
import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with ShopZone.
          Your order has been confirmed.
        </p>

        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
