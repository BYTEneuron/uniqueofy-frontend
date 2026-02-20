import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './auth.css'

export default function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  
  // Expect order object from navigation state
  const order = location.state?.order

  const [upiId, setUpiId] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
      return
    }

    if (!order) {
      navigate('/orders', { replace: true })
    }

  }, [isAuthenticated, order, navigate])


  const handlePayment = (e) => {
    e.preventDefault()
    
    // Phase E: UPI Validation
    if (!upiId || !upiId.includes('@')) {
      setError('Please enter a valid UPI ID (e.g., name@bank)')
      return
    }

    setProcessing(true)
    setError('')

    // Phase E: Simulate Payment Success
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      
      // Update order status in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('uniqueofy_orders') || '[]')
      const updatedOrders = existingOrders.map(o => 
        o.id === order.id 
          ? { 
              ...o, 
              status: 'Paid', 
              paymentDetails: {
                  method: 'UPI', 
                  upiId: upiId,
                  transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                  date: new Date().toISOString()
              }
            } 
          : o
      )
      
      localStorage.setItem('uniqueofy_orders', JSON.stringify(updatedOrders))

      // Wait 2 seconds then go back to orders
      setTimeout(() => {
          navigate('/orders')
      }, 2000)

    }, 2000)
  }

  if (!order) return null // Avoid render flash

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      
      {success ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
              <h2 style={{ marginBottom: '10px' }}>Payment Successful</h2>
              <p style={{ color: '#666' }}>Redirecting to your orders...</p>
          </div>
      ) : (
          <>
            <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Complete Payment</h1>

            <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
                <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Order #{order.id}</h3>
                    <p style={{ margin: 0, color: '#666' }}>Total Amount: <span style={{ color: '#000', fontWeight: 'bold' }}>₹{order.totalAmount || 0}</span></p>
                </div>

                <form onSubmit={handlePayment}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '0.9rem' }}>UPI ID</label>
                        <input 
                            type="text" 
                            placeholder="username@bank"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="auth-input" // Re-using auth input style for consistency
                            style={{ width: '100%', boxSizing: 'border-box' }}
                            disabled={processing}
                        />
                        {error && <p style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '5px' }}>{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className={!processing ? "auth-btn clickable-hover" : "auth-btn"}
                        style={{ opacity: processing ? 0.7 : 1 }}
                    >
                        {processing ? 'Processing...' : `Pay ₹${order.totalAmount || 0}`}
                    </button>
                    
                    <p style={{ textAlign: 'center', marginTop: '15px', color: '#888', fontSize: '0.8rem' }}>
                        <span style={{ marginRight: '5px' }}>🔒</span>
                        Secure Payment via UPI
                    </p>
                </form>
            </div>
          </>
      )}
    </div>
  )
}
