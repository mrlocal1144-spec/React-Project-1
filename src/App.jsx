import { Routes, Route } from 'react-router-dom'
import { useStore } from './Context/StoreContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CartPage from './Pages/CartPage'
import Orders from './Pages/Orders'
import AdminDashboard from './Pages/AdminDashboard'
import NotFound from './Pages/NotFound'

function App() {
  const { currentUser } = useStore()

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={currentUser?.role === 'user' ? <CartPage/> : <Login/>}/>
        <Route path="/orders" element={currentUser?.role === 'user' ? <Orders/> : <Login/>}/>
        <Route path="/admin" element={currentUser?.role === 'admin' ? <AdminDashboard/> : <Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App