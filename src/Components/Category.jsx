const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Snacks', 'Beverages']

function Category({ selected, setSelected }) {
  return (
    <div className="categories">
      {categories.map(category => (
        <button
          key={category}
          className={selected === category ? 'category active' : 'category'}
          onClick={() => setSelected(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Category