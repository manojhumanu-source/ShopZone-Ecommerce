
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const Register = () => {
    let navigate = useNavigate()

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  let handleChange = (e) => {
    let { name, value } = e.target

    setUser({ ...user, [name]: value })
  }

  let { registerUser } = useContext(AuthContext)

let handleSubmit = (e) => {
  e.preventDefault()

  if (user.password !== user.confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  let result = registerUser(user)

  if (result) {
    alert("Registration Successful!")
    navigate('/login')
  } else {
    alert("Email already registered!")
  }
}
  return (
    <div className="login-container">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
          required
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

      </form>

      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>
  )
}

export default Register
