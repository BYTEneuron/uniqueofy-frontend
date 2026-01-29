import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function Login() {
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
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

  const handleSendOtp = () => {
    if (!mobile) {
      setError('Mobile number is required')
      return
    }
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number')
      return
    }

    login(mobile)
    navigate('/verify-otp', { state: { from: redirectPath } })
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
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
        </div>

        <p className="auth-helper-text">
          We will send you a One Time Password (OTP) to this mobile number.
        </p>

        <button className="auth-btn clickable-hover" onClick={handleSendOtp}>
          Send OTP
        </button>
      </div>
    </div>
  )
}
