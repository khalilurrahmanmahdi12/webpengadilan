import type {
  ReactNode,
} from 'react'

import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

interface Props {
  children: ReactNode
}

export default function AdminProtectedRoute({
  children,
}: Props) {
  const location =
    useLocation()

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated,
    )

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  return children
}