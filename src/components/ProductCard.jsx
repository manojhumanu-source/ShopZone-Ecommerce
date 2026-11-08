
import React from 'react'

const ProductCard = ({ item }) => {

  return (
    <div className="product-card">

      <img src={item.thumbnail} alt={item.title} />

      <h3>{item.title}</h3>

      <p className="rating">
        ⭐ {item.rating}
      </p>

      <h3 className="price">
        ${item.price}
      </h3>

      <button className="add-btn">
        Add to Cart
      </button>
      <button onClick={() => {
  setSelectedProduct(item)
  setPage('details')
}}>
  View Details
</button>

    </div>
  )
}

export default ProductCard
