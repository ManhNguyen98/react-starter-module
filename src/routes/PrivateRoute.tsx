import React from 'react'
import {
  getAuthenticatedUser,
  getTokenFromStorage,
} from 'modules/shared/utils/auth'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (props) => {
  const token = getTokenFromStorage()
  const userInfo = getAuthenticatedUser()
  const isAuthenticated = token && userInfo?.id

  if (isAuthenticated) {
    return <Outlet />
  }
  return <Navigate to="/login" />
}

export default PrivateRoute
