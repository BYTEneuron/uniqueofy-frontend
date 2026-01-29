import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function VerifyOtp() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const { verifyOtp, tempPhone, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from || '/'

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectPath, { replace: true })
    } else if (!tempPhone) {
      navigate('/login')
    }
  }, [tempPhone, isLoggedIn, navigate, redirectPath])

  const handleOtpChange = (e) => {
    // Only numbers
    const value = e.target.value.replace(/\D/g, '')
    // Max 6 digits
    if (value.length <= 6) {
      setOtp(value)
      setError('')
    }
  }

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP')
      return
    }

    const isSuccess = verifyOtp(otp)
    
    if (isSuccess) {
      navigate('/profile-setup', { state: { from: redirectPath } })
    } else {
      setError('Invalid OTP. Please try again.')
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Enter OTP</h1>
      
      <p style={{ marginBottom: '24px', color: '#666' }}>
        We have sent a verification code to <br />
        <strong>+91 {tempPhone}</strong>
      </p>

      <div className="auth-form">
        <div className="auth-field">
          <input
            type="text"
            className="auth-input"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP (123456)"
            style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' }}
            maxLength="6"
          />
          {error && <div className="auth-error" style={{ textAlign: 'center' }}>{error}</div>}
        </div>

        <button className="auth-btn clickable-hover" onClick={handleVerify}>
          Verify OTP
        </button>

        <button 
          className="auth-btn clickable-hover" 
          style={{ background: 'transparent', color: '#666', marginTop: '0', fontWeight: 'normal' }}
          onClick={() => navigate('/login')}
        >
          Change Phone Number
        </button>
      </div>
    </div>
  )
}
