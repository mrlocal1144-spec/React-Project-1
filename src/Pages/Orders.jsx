import { useStore } from '../Context/StoreContext'

function Orders() {
  const { orders, currentUser } = useStore()

  const myOrders = orders.filter(order => order.user === currentUser?.email)

  return (
    <section className="section">
      <span>YOUR PURCHASES</span>
      <h2>My Orders</h2>

      {myOrders.length === 0 ? (
        <div className="empty">You haven't placed any orders yet.</div>
      ) : (
        <div className="order-list">
          {myOrders.map(order => (
            <div className="order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>

              {order.items.map(item => (
                <p key={item.id}>{item.name} × {item.quantity}</p>
              ))}

              <h3>Total: ₹{order.total}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Orders