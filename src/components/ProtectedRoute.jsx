import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const ProtectedRoute = ({ children }) => {

    let { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute