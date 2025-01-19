import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"

// Créer le contexte d'authentification
const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
})

// Fournisseur d'authentification
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser) // Met à jour l'utilisateur connecté
      setLoading(false) // Indique que la vérification est terminée
    })

    return unsubscribe // Nettoie l'écouteur quand le composant est démonté
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook pour utiliser le contexte
export const useAuth = () => useContext(AuthContext)
