import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Hero from './pages/Hero'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterProfessional from './pages/RegisterProfessional'
import SearchResults from './pages/SearchResults'
import PropertyDetail from './pages/PropertyDetail'
import RealEstateProfile from './pages/RealEstateProfile'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-professional" element={<RegisterProfessional />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/inmobiliaria" element={<RealEstateProfile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
