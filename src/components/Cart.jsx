import { useCart } from '../context/CartContext'
import './cart.css'
import cartIcon from '../assets/icons/cart.svg'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-section">
        <h3>
          <img src={cartIcon} alt="" className="cart-header-icon" />
          Your Cart
        </h3>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="cart-section">
      <h3>
        <img src={cartIcon} alt="" className="cart-header-icon" />
        Your Cart ({cart.length} items)
      </h3>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>Price discussed on call</p>
            </div>

            <div className="cart-item-controls">
              {!item.isCustom && (
                <div className="quantity-selector">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              )}
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <button className="checkout-btn">
          Proceed to Checkout
        </button>  
      </div>
    </div>
  )
}
