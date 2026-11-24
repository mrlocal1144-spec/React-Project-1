
import { createContext, useContext, useEffect, useState } from 'react'
import initialProducts from '../Data/products'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('products')) || initialProducts
  })

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('users')) || []
  })

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null
  })

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || []
  })

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('orders')) || []
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }])
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    )
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  const register = (name, email, password) => {
    if (users.some(user => user.email === email)) {
      return 'Email already registered'
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    }

    setUsers(prev => [...prev, newUser])
    setCurrentUser(newUser)
    return 'success'
  }

  const login = (email, password) => {
    if (email === 'admin@freshmart.com' && password === 'admin123') {
      setCurrentUser({
        name: 'Admin',
        email,
        role: 'admin'
      })
      return 'success'
    }

    const user = users.find(
      item => item.email === email && item.password === password
    )

    if (!user) return 'Invalid email or password'

    setCurrentUser(user)
    return 'success'
  }

  const logout = () => {
    setCurrentUser(null)
    setCart([])
  }

  const addToCart = (product) => {
    const availableProduct = products.find(item => item.id === product.id)

    if (!availableProduct || availableProduct.stock <= 0) {
      alert('Product is out of stock!')
      return
    }

    const existing = cart.find(item => item.id === product.id)
    const quantity = existing ? existing.quantity : 0

    if (quantity >= availableProduct.stock) {
      alert('Available stock limit reached!')
      return
    }

    setCart(prev => {
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const changeQuantity = (id, amount) => {
    const product = products.find(item => item.id === id)

    setCart(prev =>
      prev
        .map(item => {
          if (item.id !== id) return item

          const newQuantity = item.quantity + amount

          if (newQuantity > product.stock) {
            alert('Available stock limit reached!')
            return item
          }

          return { ...item, quantity: newQuantity }
        })
        .filter(item => item.quantity > 0)
    )
  }

  const placeOrder = () => {
    if (!cart.length || !currentUser) return false

    const unavailable = cart.some(item => {
      const product = products.find(p => p.id === item.id)
      return !product || product.stock < item.quantity
    })

    if (unavailable) {
      alert('Some products are out of stock!')
      return false
    }

    const newOrder = {
      id: Date.now(),
      user: currentUser.email,
      customer: currentUser.name,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: 'Pending',
      date: new Date().toLocaleDateString()
    }

    setOrders(prev => [...prev, newOrder])

    setProducts(prev =>
      prev.map(product => {
        const ordered = cart.find(item => item.id === product.id)

        return ordered
          ? {
              ...product,
              stock: product.stock - ordered.quantity
            }
          : product
      })
    )

    setCart([])
    return true
  }

  const updateOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    )
  }

  return (
    <StoreContext.Provider value={{
      products,
      users,
      currentUser,
      cart,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      register,
      login,
      logout,
      addToCart,
      changeQuantity,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
