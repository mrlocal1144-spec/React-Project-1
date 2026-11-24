import ProductCard from './ProductCard'

function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.length ? (
        products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  )
}

export default ProductList