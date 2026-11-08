
import React, { createContext, useState } from 'react'

export let AuthContext = createContext()

const AuthProvider = ({ children }) => {

  let [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem('loggedUser')) || null
  )

  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  )

  // Register User
  let registerUser = (user) => {

    let existing = users.find(
      (item) => item.email === user.email
    )

    if (existing) {
      return false
    }

    let updatedUsers = [...users, user]

    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    return true
  }

  // Login User
  let loginUser = (email, password) => {

    let found = users.find(
      (item) => item.email === email &&
                item.password === password
    )

    if (found) {
      setLoggedUser(found)
      localStorage.setItem('loggedUser', JSON.stringify(found))
      return true
    }

    return false
  }

  // Logout User
  let logoutUser = () => {
    setLoggedUser(null)
    localStorage.removeItem('loggedUser')
  }

  return (
    <AuthContext.Provider value={{
      loggedUser,
      registerUser,
      loginUser,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
