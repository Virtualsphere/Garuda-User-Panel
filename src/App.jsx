import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandPage } from './pages/LandPage';
import { LandDetailPage } from './pages/LandDetailPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/land" element={<LandPage />} />
          <Route path="/land/:id" element={<LandDetailPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
