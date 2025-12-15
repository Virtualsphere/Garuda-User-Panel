import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
