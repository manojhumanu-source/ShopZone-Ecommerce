import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const Login = () => {

  let [user, setUser] = useState({
    email: "",
    password: ""
  })

  let { loginUser } = useContext(AuthContext)
  let navigate = useNavigate()

  let handleChange = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    let result = loginUser(user.email, user.password)

    if (result) {
      alert("Login Successful!")
      navigate('/')
    } else {
      alert("Invalid Email or Password!")
    }
  }

  return (
    <div className="login-container">
      <h2>Login to ShopZone</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login