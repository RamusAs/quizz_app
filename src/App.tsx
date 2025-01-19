import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  AccountPage,
  AuthPage,
  CategoriesPage,
  HomePage,
  QuizPage,
  ResultsPage,
} from "./pages"
import { Layout } from "./pages/Layout"
import { syncData } from "./services/syncData"
import { db } from "./firebase"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./providers/AuthProvider"

const App = () => {
  window.syncData = () => syncData(db)
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />

          <Route path="login" element={<AuthPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:category" element={<QuizPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
