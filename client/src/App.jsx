import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import ViewCards from "./pages/ViewCards"
import StudyMode from "./pages/StudyMode"
import LandingPage from "./pages/LandingPage"
import ProtectedRoute from "./components/ProtectedRoute"
import UserProtectedRoute from "./components/UserProtectedRoute"
import DecksPage from "./pages/DecksPage"
import QuizzesPage from "./pages/QuizzesPage"

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
        <Route path="/" element={<UserProtectedRoute><LandingPage /></UserProtectedRoute>} />

        <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/app/viewCards/:deckId" element={<ProtectedRoute><ViewCards /></ProtectedRoute>} />
        <Route path="/app/studyMode/:deckId" element={<ProtectedRoute><StudyMode /></ProtectedRoute>} />
        <Route path="/app/Decks/" element={<ProtectedRoute><DecksPage /></ProtectedRoute>} />
        <Route path="/app/quizzes/" element={<ProtectedRoute><QuizzesPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
