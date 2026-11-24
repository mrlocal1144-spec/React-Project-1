
import { ShoppingBag } from 'lucide-react'
import { useStore } from '../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const { addToCart, currentUser } = useStore()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please login first!')
      navigate('/login')
      return
    }

    if (currentUser.role !== 'user') {
      alert('Admin cannot add products to cart!')
      return
    }

    addToCart(product)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name}/>
        <span className="category-tag">{product.category}</span>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="unit">{product.unit}</p>

        <div className="price-row">
          <h3>₹{product.price}</h3>
          <del>₹{product.oldPrice}</del>
        </div>

        <p className="stock">Stock: {product.stock}</p>

        <button
          className="add-cart-btn"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={17}/>
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
