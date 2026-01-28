import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './header.css'
import logo from '../assets/logos/uniqueofy-logo.svg'
import cartIcon from '../assets/icons/cart.svg'

export default function Header() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <header className="site-header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-logo">
            <img src={logo} alt="Uniqueofy logo" className="brand-logo" />
            <span className="logo-text">UNIQUEOFY</span>
          </Link>
        </h1>

        <div className="header-actions">
          <button className="header-btn login-btn">
            Login
          </button>

          <div className="cart-icon-wrapper">
            <button className="cart-icon-btn">
              <img src={cartIcon} alt="Cart" className="cart-icon-svg" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
