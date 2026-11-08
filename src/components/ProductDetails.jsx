
import React from 'react'

const ProductDetails = ({ product, addToCart, back }) => {
  return (
    <div className="product-details">
      <img src={product.thumbnail} alt={product.title} />

      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h3>⭐ {product.rating}</h3>
        <h2>₹{product.price}</h2>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button onClick={back}>
          Back to Products
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
