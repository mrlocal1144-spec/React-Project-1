import { useStore } from '../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'

function CartPage() {
  const { cart, changeQuantity, placeOrder } = useStore()
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleOrder = () => {
    placeOrder()
    alert('Your order has been placed successfully!')
    navigate('/orders')
  }

  return (
    <section className="section">
      <h2>My Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty">Your cart is empty!</div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name}/>
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} / {item.unit}</p>
                  <div className="quantity">
                    <button onClick={() => changeQuantity(item.id, -1)}><Minus size={15}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}><Plus size={15}/></button>
                    <button className="delete-btn" onClick={() => changeQuantity(item.id, -item.quantity)}><Trash2 size={16}/></button>
                  </div>
                </div>
                <h3>₹{item.price * item.quantity}</h3>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Subtotal <b>₹{total}</b></p>
            <p>Delivery <b>Free</b></p>
            <div className="total"><span>Total</span><h2>₹{total}</h2></div>
            <button className="primary-btn" onClick={handleOrder}>Place Order</button>
          </div>
        </>
      )}
    </section>
  )
}

export default CartPage