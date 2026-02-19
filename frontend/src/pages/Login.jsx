import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function Login() {
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { sendOtp, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.next || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectPath])

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

    const response = await sendOtp(mobile)

    if (response.success) {
      setIsLoading(false)
      navigate('/verify-otp', { state: { phone: mobile, next: redirectPath } })
    } else {
      setError(response.message || 'Failed to send OTP')
      setIsLoading(false)
    }
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
