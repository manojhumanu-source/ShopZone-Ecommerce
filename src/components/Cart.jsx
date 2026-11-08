
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cart, increase, decrease, remove }) => {

  let navigate = useNavigate()

  let totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  let totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <div className="cart-container">
      <h2>My Shopping Cart</h2>

      {cart.length === 0 ? (
        <h3>Your cart is empty!</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>

                <button onClick={() => decrease(item.id)}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => increase(item.id)}>+</button>

                <button onClick={() => remove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total Items: {totalItems}</h2>
          <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>

          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout →
          </button>
        </>
      )}
    </div>
  )
}

export default Cart
