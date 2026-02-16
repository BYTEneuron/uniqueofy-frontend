import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function Signup() {
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const nextPath = location.state?.next || '/'

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const handleMobileChange = (e) => {
    // Only numbers
    const value = e.target.value.replace(/\D/g, '')
    // Max 10 digits
    if (value.length <= 10) {
      setMobile(value)
      setError('') // Clear error on type
    }
  }

  const handleSendOtp = () => {
    if (!mobile) {
      setError('Mobile number is required')
      return
    }
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number')
      return
    }

    setIsLoading(true)
    setError('')

    setTimeout(() => {
        const response = signup(mobile)
        
        if (response.success) {
            // Pass state indicating we represent a Signup flow
            navigate('/verify-otp', { state: { from: 'signup', next: nextPath } })
        } else {
            setIsLoading(false)
            setError(response.message)
        }
    }, 1000)
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Create Account</h1>
      
      <div className="auth-form">
        <div className="auth-field">
          <label>Phone Number</label>
          <div className="auth-phone-wrapper">
            <span className="auth-country-code">🇮🇳 +91</span>
            <input
              type="tel"
              className="auth-input-tel"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="00000 00000"
              disabled={isLoading}
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
        </div>

        <p className="auth-helper-text">
          We will send you a One Time Password (OTP) to verify your number.
        </p>

        <button 
            className="auth-btn clickable-hover" 
            onClick={handleSendOtp}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? 'Sending OTP...' : 'Sign Up'}
        </button>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account?{' '}
          <span 
             onClick={() => navigate('/login')}
             style={{ color: '#2874f0', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
