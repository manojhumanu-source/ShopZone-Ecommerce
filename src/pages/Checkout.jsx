
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = ({ cart, clearCart, saveOrder }) => {

  let navigate = useNavigate()

  let [address, setAddress] = useState({
    name: '',
    phone: '',
    city: '',
    pincode: '',
    fullAddress: ''
  })

  let [payment, setPayment] = useState('UPI')

  let handleChange = (e) => {
    let { name, value } = e.target

    setAddress({
      ...address,
      [name]: value
    })
  }

  let totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  let handleSubmit = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    if (typeof clearCart !== 'function') {
      alert('Cart function is missing. Please check App.jsx')
      return
    }
let orderDetails = {
  id: Date.now(),
  customer: address,
  paymentMethod: payment,
  products: cart,
  totalAmount: totalPrice,
  orderDate: new Date().toLocaleString(),
  status: "Placed"
}
saveOrder(orderDetails)
clearCart()
navigate('/order-success')
  }

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      <div className="checkout-content">

        <form onSubmit={handleSubmit} className="checkout-form">

          <h3>Delivery Information</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="PIN Code"
            value={address.pincode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            title="Enter a valid 6-digit PIN code"
            required
          />

          <textarea
            name="fullAddress"
            placeholder="Full Delivery Address"
            value={address.fullAddress}
            onChange={handleChange}
            required
          />

          <h3>Select Payment Method</h3>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={payment === 'UPI'}
              onChange={(e) => setPayment(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={payment === 'COD'}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={payment === 'Card'}
              onChange={(e) => setPayment(e.target.value)}
            />
            Credit / Debit Card
          </label>

          <button type="submit">
            Place Order
          </button>

        </form>

        <div className="order-summary">

          <h3>Order Summary</h3>

          {cart.map((item) => (
            <p key={item.id}>
              {item.title} × {item.quantity}
              <span>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </p>
          ))}

          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>

        </div>

      </div>

    </div>
  )
}

export default Checkout
