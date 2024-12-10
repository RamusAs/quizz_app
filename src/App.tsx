import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CategoriesPage, HomePage, QuizPage, ResultsPage } from "./pages"
import { Layout } from "./pages/Layout"

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<Layout />}>
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:category" element={<QuizPage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>
    </Routes>
  </Router>
)

export default App
