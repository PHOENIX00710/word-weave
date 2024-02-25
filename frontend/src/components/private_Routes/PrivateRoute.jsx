import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const { userDetails } = useSelector(state => state.user)
    return (
        userDetails ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoute