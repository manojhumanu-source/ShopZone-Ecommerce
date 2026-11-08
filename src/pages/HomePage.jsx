
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const HomePage = () => {

  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=30')
      .then((res) => {
        setProducts(res.data.products)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h2>Loading Products...</h2>
  }

  return (
    <div className="homepage">

      <section className="hero">
        <h1>Discover Something Amazing</h1>
        <p>Everything you need, all in one place.</p>
      </section>

      <h2 className="section-title">Explore Products</h2>

      <div className="product-container">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  )
}

export default HomePage
