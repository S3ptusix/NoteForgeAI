import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/home"
import ViewCards from "./pages/ViewCards"
import StudyMode from "./pages/StudyMode"
import LandingPage from "./pages/LandingPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {


  return (
    <BrowserRouter>
      <ToastContainer
        hideProgressBar
        autoClose={3000}
        newestOnTop={true}
        pauseOnFocusLoss={false}
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/app/viewCards/:deckId" element={<ProtectedRoute><ViewCards /></ProtectedRoute>} />
        <Route path="/app/studyMode/:deckId" element={<ProtectedRoute><StudyMode /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
