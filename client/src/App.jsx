import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/home"
import ViewCards from "./pages/ViewCards"
import StudyMode from "./pages/StudyMode"
import LandingPage from "./pages/LandingPage"

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

        <Route path="/app" element={<Home />} />
        <Route path="/app/viewCards/:deckId" element={<ViewCards />} />
        <Route path="/app/studyMode/:deckId" element={<StudyMode />} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
