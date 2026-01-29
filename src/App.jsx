import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Confirmation from './pages/Confirmation'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import VerifyOtp from './pages/VerifyOtp'
import ProfileSetup from './pages/ProfileSetup'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
