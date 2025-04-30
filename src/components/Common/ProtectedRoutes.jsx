import React from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoutes = ({ children, role }) => {

    const { user } = useSelector((state) => state.auth);

    if (!user || (role && user.role !== role)) {
        return <Navigate to="/login" replace />
    }

    
    return children
}

export default ProtectedRoutes