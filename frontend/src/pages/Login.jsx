import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function Login() {
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from || '/'

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectPath, { replace: true })
    }
  }, [isLoggedIn, navigate, redirectPath])

  const handleMobileChange = (e) => {
    // Only numbers
    const value = e.target.value.replace(/\D/g, '')
    // Max 10 digits
    if (value.length <= 10) {
      setMobile(value)
      setError('') // Clear error on type
    }
  }

  const handleSendOtp = async () => {
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

    // Simulate API call
    setTimeout(() => {
        const response = login(mobile)
        
        if (response.success) {
            navigate('/verify-otp', { state: { from: 'login', next: redirectPath } })
        } else {
            // Show error and link to signup
            setIsLoading(false)
            setError(
                <span>
                    No account found with this number.{' '}
                    <span 
                        style={{ color: '#2874f0', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                        onClick={() => navigate('/signup', { state: { next: redirectPath } })}
                    >
                        If you are a new user, please Sign Up.
                    </span>
                </span>
            )
        }
    }, 1000)
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login to Continue</h1>
      
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
          We will send you a One Time Password (OTP) to this mobile number.
        </p>

        <button 
            className="auth-btn clickable-hover" 
            onClick={handleSendOtp}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </div>
    </div>
  )
}
