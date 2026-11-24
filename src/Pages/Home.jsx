import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Leaf, ShieldCheck } from 'lucide-react'
import { useStore } from '../Context/StoreContext'
import ProductList from '../Components/ProductList'

function Home() {
  const { products } = useStore()

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">FRESHNESS DELIVERED DAILY</span>
          <h1>Good Food.<br/>Good Mood.</h1>
          <p>Fresh fruits, vegetables and everyday groceries delivered to your doorstep.</p>
          <Link to="/products" className="hero-btn">
            Shop Now <ArrowRight size={18}/>
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000"
            alt="Fresh groceries"
          />
        </div>
      </section>

      <section className="features">
        <div><Truck/><h3>Fast Delivery</h3><p>Quick delivery to your home</p></div>
        <div><Leaf/><h3>Fresh Products</h3><p>Freshness in every purchase</p></div>
        <div><ShieldCheck/><h3>Quality Assured</h3><p>Quality products you can trust</p></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span>OUR SELECTION</span>
            <h2>Popular Groceries</h2>
          </div>
          <Link to="/products">View All <ArrowRight size={16}/></Link>
        </div>
        <ProductList products={products.slice(0, 4)}/>
      </section>
    </>
  )
}

export default Home