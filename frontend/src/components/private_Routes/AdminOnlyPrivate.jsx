import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function AdminOnlyPrivate() {
    const navigate = useNavigate()
    const userDetails = useSelector(state => state.user.userDetails)
    return (
        userDetails &&
            userDetails.isAdmin ? (
            <Outlet />
        ) : (
            <Navigate to={"/"} />
        )
    )
}

export default AdminOnlyPrivate