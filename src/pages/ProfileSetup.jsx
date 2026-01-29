import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function ProfileSetup() {
  const [form, setForm] = useState({ firstName: '', lastName: '' })
  const [errors, setErrors] = useState({})
  const { completeProfile, tempPhone } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from || '/'

  useEffect(() => {
    if (!tempPhone) {
      navigate('/login')
    }
  }, [tempPhone, navigate])

  const handleNameChange = (e) => {
    const { name, value } = e.target
    const processed = value
      .replace(/[^A-Za-z ]/g, "")     // only letters & space
      .replace(/\s{2,}/g, " ")        // collapse multiple spaces
      .replace(/^\s/, "")             // prevent leading space

    setForm(prev => ({ ...prev, [name]: processed }))
    
    // Clear error
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!form.firstName.trim() || !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.firstName.trim())) {
      newErrors.firstName = "Enter a valid first name"
    }

    if (!form.lastName.trim() || !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.lastName.trim())) {
      newErrors.lastName = "Enter a valid last name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      completeProfile(form.firstName, form.lastName)
      navigate(redirectPath)
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Complete Profile</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Please enter your details to continue.
      </p>
      
      <div className="auth-form">
        <div className="auth-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="auth-input"
            value={form.firstName}
            onChange={handleNameChange}
            placeholder="Enter first name"
          />
          {errors.firstName && <div className="auth-error">{errors.firstName}</div>}
        </div>

        <div className="auth-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="auth-input"
            value={form.lastName}
            onChange={handleNameChange}
            placeholder="Enter last name"
          />
          {errors.lastName && <div className="auth-error">{errors.lastName}</div>}
        </div>

        <button className="auth-btn clickable-hover" onClick={handleSubmit}>
          Continue to Home
        </button>
      </div>
    </div>
  )
}
