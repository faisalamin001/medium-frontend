import { Navigate, useLocation } from "react-router-dom"
import { useUserStore } from "../store/userStore"

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element
  allowedRoles: string[]
}) => {
  // if user is not logged in, redirect to login page
  const accessToken = localStorage.getItem("token")
  const { user } = useUserStore()

  const location = useLocation()

  // If no user or role doesn't match, redirect to auth
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth" replace />
  }

  if (!accessToken || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}
