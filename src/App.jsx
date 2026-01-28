import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <CartProvider>
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
    </CartProvider>
  )
}

export default App
