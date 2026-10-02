import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 89.99,
    image: 'https://via.placeholder.com/300x200?text=Headphones',
    rating: 4.5,
    stock: 10
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200?text=Watch',
    rating: 4.2,
    stock: 5
  },
  {
    id: 3,
    name: 'Running Shoes',
    category: 'Fashion',
    price: 74.99,
    image: 'https://via.placeholder.com/300x200?text=Shoes',
    rating: 4.7,
    stock: 12
  },
  {
    id: 4,
    name: 'Coffee Mug',
    category: 'Home',
    price: 12.99,
    image: 'https://via.placeholder.com/300x200?text=Mug',
    rating: 4.0,
    stock: 20
  }
]

function App() {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount(prev => prev + 1)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">ShopEase</div>
          <ul className="navbar-menu">
            <li><a href="#" className="nav-link">Home</a></li>
            <li><a href="#" className="nav-link">Shop</a></li>
            <li><a href="#" className="nav-link">About</a></li>
            <li><a href="#" className="nav-link">Contact</a></li>
            <li>
              <a href="#" className="nav-link" position="relative">
                Cart
                <span className="cart-badge">{cartCount}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <h1>Discover Great Products</h1>
          <p>Find the latest trends and best deals on quality items.</p>
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search products..." />
            <button className="search-button">Search</button>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      <section className="section-title">
        <h2>Featured Products</h2>
      </section>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-rating">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 >= 0.5 ? '★' : ''}
              </div>
              <button className="btn-view" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
	  );
}
export default App
