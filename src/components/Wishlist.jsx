
import React from 'react'

const Wishlist = ({ wishlist, removeFromWishlist, addToCart }) => {

  return (
    <div className="product-container">

      <h2 className="heading">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <h3>Your Wishlist is Empty!</h3>
      ) : (

        wishlist.map((item) => (

          <div className="product-card" key={item.id}>

            <img src={item.thumbnail} alt={item.title} />

            <h3>{item.title}</h3>
            <h3>₹{item.price}</h3>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>

            <button onClick={() => removeFromWishlist(item.id)}>
              Remove ❤️
            </button>

          </div>

        ))

      )}

    </div>
  )
}

export default Wishlist
