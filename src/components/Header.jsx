import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './header.css'
import logo from '../assets/logos/uniqueofy-logo.svg'
import cartIcon from '../assets/icons/cart.svg'

export default function Header() {
  const { getServiceCount, clearCart } = useCart()
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()
  const cartCount = getServiceCount()

  const handleLogout = () => {
    logout()
    clearCart()
    localStorage.removeItem('pendingBookingForm')
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-logo clickable-hover">
            <img src={logo} alt="Uniqueofy logo" className="brand-logo" />
            <span className="logo-text">UNIQUEOFY</span>
          </Link>
        </h1>

        <div className="header-actions">
          {isLoggedIn ? (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="user-name" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Hi, {user?.firstName}</span>
              <button 
                className="header-btn login-btn clickable-hover" 
                onClick={handleLogout}
                style={{ backgroundColor: 'transparent', color: '#000', border: '1px solid #ddd' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="header-btn login-btn clickable-hover" onClick={() => navigate('/login')}>
              Login
            </button>
          )}

          <div className="cart-icon-wrapper">
            <Link to="/cart" className="cart-icon-btn clickable-hover">
              <img src={cartIcon} alt="Cart" className="cart-icon-svg" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
