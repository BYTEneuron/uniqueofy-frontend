import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

export default function Confirmation() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear cart on successful booking confirmation
    clearCart()
  }, []) // Empty dependency array ensures this runs only once on mount

  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
      <h1 style={{ color: '#213547', marginBottom: '16px' }}>Booking Request Received!</h1>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
        Our team will contact you shortly to confirm details and discuss pricing.
        <br />
        Thank you for choosing Uniqueofy.
      </p>
      
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          backgroundColor: '#000',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
      >
        Back to Home
      </Link>
    </div>
  )
}
