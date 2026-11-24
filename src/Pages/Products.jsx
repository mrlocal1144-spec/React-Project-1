import { useState } from 'react'
import { Search } from 'lucide-react'
import { useStore } from '../Context/StoreContext'
import ProductList from '../Components/ProductList'
import Category from '../Components/Category'

function Products() {
  const { products } = useStore()
  const [selected, setSelected] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products.filter(product => {
    const matchCategory = selected === 'All' || product.category === selected
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <section className="section products-page">
      <div className="section-heading">
        <div>
          <span>EXPLORE FRESHNESS</span>
          <h2>All Groceries</h2>
        </div>
      </div>

      <div className="search-box">
        <Search/>
        <input
          placeholder="Search groceries..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Category selected={selected} setSelected={setSelected}/>
      <ProductList products={filtered}/>
    </section>
  )
}

export default Products