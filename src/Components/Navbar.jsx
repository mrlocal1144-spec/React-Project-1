
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, LogOut, User } from 'lucide-react'
import { useStore } from '../Context/StoreContext'

function Navbar() {
  const { currentUser, logout, cart } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>🥬</span> FreshMart
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {currentUser?.role === 'user' && <Link to="/orders">My Orders</Link>}
        {currentUser?.role === 'admin' && <Link to="/admin">Dashboard</Link>}
      </div>

      <div className="nav-actions">
        {currentUser?.role === 'user' && (
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={20}/>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </Link>
        )}

        {currentUser ? (
          <>
            <span className="welcome"><User size={16}/> {currentUser.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16}/> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="login-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
