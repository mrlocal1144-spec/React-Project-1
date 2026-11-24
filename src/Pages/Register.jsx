import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../Context/StoreContext'

function Register() {
  const { register } = useStore()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const result = register(name, email, password)

    if (result === 'success') {
      navigate('/')
    } else {
      setError(result)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span>JOIN FRESHMART</span>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <label>Full Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required/>

        <label>Email Address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>

        <label>Password</label>
        <input type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required/>

        <button className="primary-btn">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  )
}

export default Register