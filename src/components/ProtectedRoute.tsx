import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth()

  if (!user && !loading) {
    return <Navigate to="/login" replace /> // Redirige vers /login si aucun utilisateur n'est connecté
  }

  return <>{children}</> // Affiche le contenu protégé si l'utilisateur est connecté
}

export default ProtectedRoute
