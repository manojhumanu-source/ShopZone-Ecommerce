
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Wishlist from './components/Wishlist'
import Checkout from './pages/CheckOut'
import OrderSuccess from './pages/OrderSuccess.jsx'
import OrderHistory from './pages/OrderHistory'


const App = () => {

  let [products, setProducts] = useState([])
  let [cart, setCart] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
)
  let [selectedProduct, setSelectedProduct] = useState(null)
  let [search, setSearch] = useState("")
  let { loggedUser, logoutUser } = useContext(AuthContext)
  let navigate = useNavigate()
  let [selectedCategory, setSelectedCategory] = useState("all")
  let [sortBy, setSortBy] = useState("default")
  let [wishlist, setWishlist] = useState(
  JSON.parse(localStorage.getItem("wishlist")) || []
)
let [orders, setOrders] = useState(
  JSON.parse(localStorage.getItem("orders")) || []
)


let saveOrder = (order) => {
  setOrders((prevOrders) => [...prevOrders, order])
}
let [currentPage, setCurrentPage] = useState(1)

let productsPerPage = 12

useEffect(() => {
  localStorage.setItem("orders", JSON.stringify(orders))
}, [orders])

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
}, [wishlist])

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart))
}, [cart])
  useEffect(() => {
   axios.get('https://dummyjson.com/products?limit=0')
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch((err) => console.log(err))
  }, [])

  // Add to Cart
  let addToCart = (item) => {
    let existing = cart.find((product) => product.id === item.id)

    if (existing) {
      setCart(cart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  // Increase Quantity
  let increase = (id) => {
    setCart(cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  }

  let cancelOrder = (id) => {
  let updatedOrders = orders.map((order) =>
    order.id === id
      ? { ...order, status: "Cancelled" }
      : order
  )

  setOrders(updatedOrders)
}
  // Decrease Quantity
  let decrease = (id) => {
    setCart(cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter((item) => item.quantity > 0))
  }

  // Remove Product
  let remove = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }
  // Add to Wishlist
let addToWishlist = (item) => {
  let existing = wishlist.find((product) => product.id === item.id)

  if (existing) {
    alert("Already in Wishlist!")
  } else {
    setWishlist([...wishlist, item])
  }
}

// Remove from Wishlist
let removeFromWishlist = (id) => {
  setWishlist(wishlist.filter((item) => item.id !== id))
}

  let totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  )
  let filteredProducts = products.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase()) &&
  (selectedCategory === "all" ||
   item.category === selectedCategory)
)
let sortedProducts = [...filteredProducts]

if (sortBy === "low") {
  sortedProducts.sort((a, b) => a.price - b.price)
}
else if (sortBy === "high") {
  sortedProducts.sort((a, b) => b.price - a.price)
}
else if (sortBy === "rating") {
  sortedProducts.sort((a, b) => b.rating - a.rating)
}
else if (sortBy === "name") {
  sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
}
let totalPages = Math.ceil(sortedProducts.length / productsPerPage)

let startIndex = (currentPage - 1) * productsPerPage

let displayedProducts = sortedProducts.slice(
  startIndex,
  startIndex + productsPerPage
)
let categories = ["all", ...new Set(
  products.map((item) => item.category)
)]
  return (

    <div>

      {/* Navbar */}
      <nav className="navbar">

        <Link to="/" className="logo">ShopZone</Link>
<input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }}
/>
<select
  value={selectedCategory}
  onChange={(e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }}
>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category.toUpperCase()}
    </option>
  ))}
</select>
<select
  value={sortBy}
  onChange={(e) => {
    setSortBy(e.target.value)
    setCurrentPage(1)
  }}
>
  <option value="default">Sort By</option>
  <option value="low">Price: Low to High</option>
  <option value="high">Price: High to Low</option>
  <option value="rating">Highest Rating</option>
  <option value="name">Name: A to Z</option>
</select>
        <div>
          <Link to="/">Home</Link>

          <Link to="/cart">Cart 🛒 </Link>
          

          {loggedUser ? (
            <>
              <span>Welcome, {loggedUser.name}</span>

              <button onClick={() => {
                logoutUser()
                navigate('/login')
              }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/wishlist">
   Wishlist  
</Link>
<Link to="/orders">My Orders</Link>
        </div>

      </nav>

      <Routes>
     <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout
        cart={cart}
        saveOrder={saveOrder}
        clearCart={() => {
          setCart([])
          localStorage.setItem("cart", JSON.stringify([]))
        }}
      />
    </ProtectedRoute>
  }
/>
<Route
  path="/wishlist"
  element={
    <Wishlist
      wishlist={wishlist}
      removeFromWishlist={removeFromWishlist}
      addToCart={addToCart}
    />
  }
/><Route
  path="/orders"
  element={
    <ProtectedRoute>
      <OrderHistory
        orders={orders}
        cancelOrder={cancelOrder}
      />
    </ProtectedRoute>
  }
/>

        <Route path="/register" element={<Register />} />

        {/* Home Page */}
        <Route path="/" element={
          <>
            <section className="hero">
              <h1>Welcome to ShopZone</h1>
              <p>Everything you need, all in one place.</p>
              <button>Shop Now</button>
            </section>

            <h2 className="heading">Explore Products</h2>
<div className="product-count">
  <p>
    Showing{" "}
    {sortedProducts.length === 0 ? 0 : startIndex + 1}
    {" – "}
    {Math.min(startIndex + productsPerPage, sortedProducts.length)}
    {" of "}
    {sortedProducts.length} products
  </p>
</div>
            <div className="product-container">

            {displayedProducts.map((item) => (
                <div className="product-card" key={item.id}>

                  <img src={item.thumbnail} alt={item.title} />

                  <h3>{item.title}</h3>
                  <p>⭐ {item.rating}</p>
                  <h3>₹{item.price}</h3>
                  <button onClick={() => addToWishlist(item)}>
  ❤️ Add to Wishlist
</button>
                  <button onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>

                  <button onClick={() => {
                    setSelectedProduct(item)
                    navigate('/details')
                  }}>
                    View Details
                  </button>

                </div>
                
                
              ))}
              <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      className={currentPage === index + 1 ? "active" : ""}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>

            </div>
          </>
        } />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Cart Page */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cart={cart}
                increase={increase}
                decrease={decrease}
                remove={remove}
              />
            </ProtectedRoute>
          }
        />

        {/* Product Details Page */}
        <Route path="/details" element={
          selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              addToCart={addToCart}
              back={() => navigate('/')}
            />
          )
        } />

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout
  cart={cart}
  saveOrder={saveOrder}
  clearCart={() => {
    setCart([])
    localStorage.setItem("cart", JSON.stringify([]))
  }}
/>
    </ProtectedRoute>
  }
/>

<Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>
      </Routes>

    </div>
  )
}

export default App
