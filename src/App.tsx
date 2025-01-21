import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import {
  AccountPage,
  AuthPage,
  CategoriesPage,
  ParametersPage,
  QuizPage,
  ResultsPage,
} from "./pages"
import { Layout } from "./pages/Layout"
//import { syncData } from "./services/syncData"
//import { db } from "./firebase"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./providers/AuthProvider"

const App = () => {
  // window.syncData = () => syncData(db)
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/quiz" replace />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="quiz" element={<CategoriesPage />} />
            <Route path="quiz/:category" element={<QuizPage />} />
            <Route path="parameters" element={<ParametersPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
