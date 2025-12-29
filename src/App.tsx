import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
