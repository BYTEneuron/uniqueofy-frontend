import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Orders() {
  const { clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  

  const isNewBooking = !!location.state?.newBooking

  const [showConfirmation, setShowConfirmation] = useState(isNewBooking)
  const [showOrders, setShowOrders] = useState(!isNewBooking)
  const [canPay, setCanPay] = useState(false)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Track loading state

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
      return
    }

    const savedOrders = JSON.parse(localStorage.getItem('uniqueofy_orders') || '[]')

    if (user?.phone) {
      const userOrders = savedOrders.filter(o => o.customer?.mobile === user.phone)
      setOrders(userOrders)
    } else {
      setOrders([])
    }

    setIsLoading(false)

  }, [isAuthenticated, user, navigate])


  useEffect(() => {
    // Handle new order confirmation flow
    if (showConfirmation) {
      // Clear cart when showing confirmation (redundant if handled in CartContext, but safe)
      clearCart()
      
      // Auto-switch to orders list after 3 seconds
      const timer = setTimeout(() => {
        setShowConfirmation(false)
        setShowOrders(true)
        // Properly clear the state
        navigate(location.pathname, { replace: true, state: {} })
      }, 3000)
  
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirmation, location.pathname, navigate]) // Added stable dependencies


  useEffect(() => {
    // TEMPORARY: Replace this timer with admin-controlled payment status in future backend
    // Reduced to 2 seconds for better user experience during demo
    const timer = setTimeout(() => setCanPay(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handlePaymentClick = () => {
    if (!canPay) {
      alert("You can pay after charges are discussed with our team.")
    } else {
      navigate('/payment', { state: { order: orders[0] } })
    }
  }

  // Display 'Booking Confirmed' overlay
  // We use conditional rendering below instead of early return
  
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
       
       {showConfirmation && (
          <div style={{
            position: 'fixed',
            top: 0, 
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            textAlign: 'center'
           }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#000' }}>Booking Confirmed!</h1>
              <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', lineHeight: '1.5' }}>
                Our team will contact you shortly to confirm details and discuss pricing.
              </p>
           </div>
       )}

       {showOrders && isLoading ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
              Loading your orders...
          </div>
       ) : showOrders && orders.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2>No orders found</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>You haven't placed any bookings yet.</p>
              <Link 
                to="/" 
                style={{ 
                    display: 'inline-block',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}
              >
                Go to Home
              </Link>
          </div>
       ) : showOrders && (
         <>
           <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>My Orders</h1>
       
           {orders.map((order, index) => (
               <div key={index} style={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '30px',
                  marginBottom: '30px',
                  border: '1px solid #eee'
               }}>
                 {/* Order Details Header */}
                 <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                       <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Order #{order.id}</h3>
                       <p style={{ color: '#888', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                       </p>
                    </div>
                    {/* Status Badge */}
                    <div style={{ 
                       backgroundColor: '#e8f5e9', 
                       color: '#2e7d32', 
                       padding: '6px 12px', 
                       borderRadius: '20px', 
                       fontSize: '0.9rem', 
                       fontWeight: '600',
                       height: 'fit-content'
                    }}>
                       {order.status || 'Pending Quote'}
                    </div>
                 </div>
        
                 {/* Services List */}
                 <div style={{ marginBottom: '30px' }}>
                    <h4 style={{ marginBottom: '15px', fontSize: '1rem', color: '#000' }}>Services Booked</h4>
                    {order.items && order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: index === (order.items.length - 1) ? 'none' : '1px solid #fafafa' }}>
                            <span style={{ color: '#333' }}>{item.name}</span>
                            <span style={{ fontWeight: '600' }}>x{item.quantity}</span>
                        </div>
                    ))}
                 </div>
        
                 {/* Booking Details */}
                 <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
                        <div>
                           <p style={{ color: '#666', marginBottom: '5px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Date</p>
                           <p style={{ fontWeight: '600', margin: 0 }}>{order.customer?.date || 'N/A'}</p>
                        </div>
                        <div>
                           <p style={{ color: '#666', marginBottom: '5px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Time</p>
                           <p style={{ fontWeight: '600', margin: 0 }}>{order.customer?.timeSlot || 'Not specified'}</p> 
                        </div>
                     </div>
                 </div>
        
                 {/* Message & Payment Action (Only for the latest order) */}
                 {index === 0 && (
                     <>
                         <div style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', marginBottom: '25px', padding: '0 20px' }}>
                            "Our team will call you to discuss final charges before payment."
                         </div>
            
                         <button
                            onClick={handlePaymentClick}
                            className={canPay ? "clickable-hover" : ""}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: canPay ? '#000' : '#e0e0e0',
                                color: canPay ? '#fff' : '#a0a0a0',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: canPay ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                         >
                            Proceed to Payment
                            {!canPay && <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(Checking status...)</span>}
                         </button>
                     </>
                 )}
               </div>
           ))}
         </>
       )}
    </div>
  )
}
