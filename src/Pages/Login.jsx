import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../Context/StoreContext'

function Login() {
  const { login } = useStore()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const result = login(email, password)

    if (result === 'success') {
      navigate(email === 'admin@freshmart.com' ? '/admin' : '/')
    } else {
      setError(result)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span>WELCOME BACK</span>
        <h2>Login to FreshMart</h2>
        {error && <p className="error">{error}</p>}

        <label>Email Address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>

        <button className="primary-btn">Login</button>

        <p>New customer? <Link to="/register">Create Account</Link></p>

        <div className="demo-info">
          <b>Admin Demo</b>
          <p>admin@freshmart.com</p>
          <p>admin123</p>
        </div>
      </form>
    </section>
  )
}

export default Login