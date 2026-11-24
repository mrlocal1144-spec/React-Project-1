import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useStore } from '../Context/StoreContext'

function Cart() {
  const { cart, changeQuantity } = useStore()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <section className="section cart-page">
      <div className="section-heading">
        <div>
          <span>YOUR SHOPPING</span>
          <h2>My Cart</h2>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty">
          <ShoppingBag size={50}/>
          <h2>Your Cart is Empty!</h2>
          <p>Start adding your favourite groceries.</p>
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name}/>

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.category} · {item.unit}</p>
                <h3>₹{item.price}</h3>

                <div className="quantity">
                  <button onClick={() => changeQuantity(item.id, -1)}>
                    <Minus size={15}/>
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => changeQuantity(item.id, 1)}>
                    <Plus size={15}/>
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => changeQuantity(item.id, -item.quantity)}
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>

              <h3>₹{item.price * item.quantity}</h3>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Items: <b>{cart.reduce((sum, item) => sum + item.quantity, 0)}</b></p>
            <p>Subtotal: <b>₹{total}</b></p>
            <p>Delivery: <b>Free</b></p>

            <div className="total">
              <span>Total Amount</span>
              <h2>₹{total}</h2>
            </div>

            <Link to="/cart" className="primary-btn checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart