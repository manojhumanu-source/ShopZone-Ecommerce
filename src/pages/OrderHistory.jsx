
import React from 'react'


const OrderHistory = ({ orders, cancelOrder }) => {
  return (
    <div className="order-history">

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <h3>No orders found!</h3>
      ) : (
        orders.map((order) => (

          <div className="order-card" key={order.id}>

            <h3>Order ID: {order.id}</h3>

            <p>Date: {order.orderDate}</p>

            <p>Payment: {order.paymentMethod}</p>

            <h4>Products:</h4>
            

            {order.products.map((item) => (
              <p key={item.id}>
                {item.title} × {item.quantity}
              </p>
            ))}

            <h3>
              Total: ₹{order.totalAmount.toFixed(2)}
            </h3>
<p>
 <strong className={order.status === "Cancelled" ? "cancelled" : "placed"}>
  {order.status}
</strong>
</p>

{order.status !== "Cancelled" && (
  <button onClick={() => cancelOrder(order.id)}>
    Cancel Order
  </button>
)}
          </div>

        ))
      )}

    </div>
  )
}

export default OrderHistory
