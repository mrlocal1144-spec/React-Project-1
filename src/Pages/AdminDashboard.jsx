import { useState } from 'react'
import { useStore } from '../Context/StoreContext'
import { Package, ShoppingBag, Users, Trash2, Pencil, Plus } from 'lucide-react'

const emptyProduct = {
  name: '',
  category: 'Fruits',
  price: '',
  oldPrice: '',
  unit: '1 kg',
  image: '',
  stock: ''
}

function AdminDashboard() {
  const {
    products, users, orders,
    addProduct, updateProduct, deleteProduct, updateOrderStatus
  } = useStore()

  const [tab, setTab] = useState('Products')
  const [form, setForm] = useState(emptyProduct)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    const product = {
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      stock: Number(form.stock)
    }

    if (editId) {
      updateProduct(editId, product)
    } else {
      addProduct(product)
    }

    setForm(emptyProduct)
    setEditId(null)
    setShowForm(false)
  }

  const handleEdit = product => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      unit: product.unit,
      image: product.image,
      stock: product.stock
    })
    setEditId(product.id)
    setShowForm(true)
  }

  return (
    <section className="admin-page">
      <div className="admin-heading">
        <div>
          <span>FRESHMART CONTROL CENTER</span>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-avatar">A</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><Package/><p>Total Products</p><h2>{products.length}</h2></div>
        <div className="stat-card"><ShoppingBag/><p>Total Orders</p><h2>{orders.length}</h2></div>
        <div className="stat-card"><Users/><p>Registered Users</p><h2>{users.length}</h2></div>
      </div>

      <div className="admin-tabs">
        {['Products', 'Orders'].map(item => (
          <button
            key={item}
            className={tab === item ? 'tab active-tab' : 'tab'}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === 'Products' && (
        <div className="admin-panel">
          <div className="panel-heading">
            <h2>Manage Products</h2>
            <button className="primary-btn small-btn" onClick={() => {
              setForm(emptyProduct)
              setEditId(null)
              setShowForm(!showForm)
            }}>
              <Plus size={17}/> Add Product
            </button>
          </div>

          {showForm && (
            <form className="product-form" onSubmit={handleSubmit}>
              <h3>{editId ? 'Edit Product' : 'Add New Product'}</h3>

              <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required/>

              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Snacks', 'Beverages'].map(c => <option key={c}>{c}</option>)}
              </select>

              <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required/>
              <input type="number" placeholder="Old Price" value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})}/>
              <input placeholder="Unit (1 kg)" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}/>
              <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required/>
              <input className="full-input" placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required/>

              <button className="primary-btn">{editId ? 'Update Product' : 'Save Product'}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          )}

          <div className="admin-product-list">
            {products.map(product => (
              <div className="admin-product" key={product.id}>
                <img src={product.image} alt={product.name}/>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category} · ₹{product.price} · Stock: {product.stock}</p>
                </div>
                <button className="icon-btn" onClick={() => handleEdit(product)}><Pencil size={17}/></button>
                <button className="icon-btn delete-btn" onClick={() => {
                  if (window.confirm('Delete this product?')) deleteProduct(product.id)
                }}><Trash2 size={17}/></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Orders' && (
        <div className="admin-panel">
          <h2>Customer Orders</h2>

          {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Customer: {order.customer}</p>
              <p>Email: {order.user}</p>
              {order.items.map(item => <p key={item.id}>{item.name} × {item.quantity}</p>)}
              <h3>Total: ₹{order.total}</h3>
              <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}>
                <option>Pending</option>
                <option>Accepted</option>
                <option>Packed</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminDashboard