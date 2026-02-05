import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (service, quantity = 1) => {
    // ... logic remains same, function is recreated but context value will be memoized
    const existingItem = cart.find(item => item.id === service.id)

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === service.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCart([...cart, { ...service, quantity }])
    } 
  }

  const removeFromCart = (serviceId) => {
    setCart(cart.filter(item => item.id !== serviceId))
  }

  const updateQuantity = (serviceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceId)
    } else {
      setCart(cart.map(item =>
        item.id === serviceId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const getServiceCount = () => {
    return cart.length
  }

  const clearCart = () => {
    setCart([])
  }

  const addOrder = (customerDetails) => {
    const newOrder = {
        id: Date.now(),
        items: cart,
        customer: customerDetails,
        orderDate: new Date().toISOString(),
        status: 'Pending Quote', 
        totalAmount: 0 
    }
    const existingOrders = JSON.parse(localStorage.getItem('uniqueofy_orders') || '[]')
    localStorage.setItem('uniqueofy_orders', JSON.stringify([newOrder, ...existingOrders]))
    clearCart()
    return newOrder
  }

  const value = useMemo(() => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
      getCartCount,
      getServiceCount,
      clearCart,
      addOrder
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [cart])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
