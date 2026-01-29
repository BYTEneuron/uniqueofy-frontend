import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tempPhone, setTempPhone] = useState('') // Store phone during OTP process

  // Initialize from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('uniqueofy_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
  }, [])

  // Listen for storage events (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'uniqueofy_user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue))
          setIsLoggedIn(true)
        } else {
          setUser(null)
          setIsLoggedIn(false)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  const login = (phone) => {
    setTempPhone(phone)
    // In a real app, this would trigger SMS sending
    console.log(`Sending OTP to ${phone}`)
  }

  const verifyOtp = (otp) => {
    if (otp === '123456') {
      // OTP verified, but user not logged in yet until profile is completed
      return true
    }
    return false
  }

  const completeProfile = (firstName, lastName) => {
    const newUser = {
      phone: tempPhone,
      firstName,
      lastName
    }
    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('uniqueofy_user', JSON.stringify(newUser))
    setTempPhone('')
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('uniqueofy_user') // Clear persistence
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      tempPhone,
      login,
      verifyOtp,
      completeProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
