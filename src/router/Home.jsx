
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {

  let [cart, setCart] = useState([])

  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">ShopZone</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/product">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
        </div>
      </nav>

      <Outlet context={{ cart, setCart }} />
    </div>
  )
}

export default Home
