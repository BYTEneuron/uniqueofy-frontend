import { createContext, useContext, useState, useEffect, useMemo } from 'react'

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
    // 1. Check Hardcoded User
    if (phone === '0000000000') {
      setTempPhone(phone)
      return { success: true }
    }

    // 2. Check Registered Users
    const usersDb = JSON.parse(localStorage.getItem('uniqueofy_users_db') || '{}')
    if (usersDb[phone]) {
      setTempPhone(phone)
      return { success: true }
    }

    return { success: false, message: 'User not found' }
  }

  const signup = (phone) => {
    // Check if user already exists
    if (phone === '0000000000') {
         return { success: false, message: 'User already exists. Please Login.' }
    }

    const usersDb = JSON.parse(localStorage.getItem('uniqueofy_users_db') || '{}')
    if (usersDb[phone]) {
      return { success: false, message: 'User already exists. Please Login.' }
    }

    setTempPhone(phone)
    return { success: true }
  }

  const verifyOtp = (otp) => {
    if (otp === '123456') {
      return true
    }
    return false
  }

  // Finalize login for existing user who passed OTP
  const finalizeLogin = () => {
     let userProfile = null;

     if (tempPhone === '0000000000') {
        userProfile = {
            phone: '0000000000',
            firstName: 'Dheeraj',
            lastName: 'Kumar'
        }
     } else {
        const usersDb = JSON.parse(localStorage.getItem('uniqueofy_users_db') || '{}')
        userProfile = usersDb[tempPhone]
     }

     if (userProfile) {
        setUser(userProfile)
        setIsLoggedIn(true)
        localStorage.setItem('uniqueofy_user', JSON.stringify(userProfile))
        setTempPhone('')
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
    
    // Save to DB
    const usersDb = JSON.parse(localStorage.getItem('uniqueofy_users_db') || '{}')
    usersDb[tempPhone] = newUser
    localStorage.setItem('uniqueofy_users_db', JSON.stringify(usersDb))

    // Set Session
    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('uniqueofy_user', JSON.stringify(newUser))
    setTempPhone('')
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('uniqueofy_user') // Clear persistence
    // Note: We do NOT clear 'uniqueofy_users_db' (all users) or 'uniqueofy_orders' (all orders)
    // But requirement says "Clear user-specific orders". 
    // Since 'uniqueofy_orders' is currently a flat list of all orders, we might want to filter?
    // The previous code had: localStorage.removeItem('uniqueofy_orders')
    // The requirement says: "Logging out must: Clear user-specific orders"
    // Does that mean delete them from DB? Or just clear from view? 
    // Usually it means clearing the local session data so next user doesn't see them.
    // 'uniqueofy_orders' likely stores ALL orders mixed. 
    // If we clear it, we lose data. If we don't, next user sees all orders (if we don't filter).
    // Best approach: Keep DB, but UI should filter by logged in user.
    // However, to satisfy "Clear user-specific orders" and "Simulating backend", 
    // I will simply ensure the orders page filters by current user.
  }

  const value = useMemo(() => ({
      user,
      isLoggedIn,
      tempPhone,
      login,
      signup,
      verifyOtp,
      finalizeLogin,
      completeProfile,
      logout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user, isLoggedIn, tempPhone])

  return (
    <AuthContext.Provider value={value}>
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
