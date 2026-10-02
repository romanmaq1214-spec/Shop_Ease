import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setQuantity(1); // reset quantity when product changes
    } else {
      // Product not found, redirect to shop
      navigate('/shop');
    }
  }, [productId, navigate]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToCart = () => {
    // In a real app, we would add to cart context or state
    // For now, we'll just alert
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <Navbar />
      <main className="product-details-page">
        <div className="product-details-container">
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="product-detail-image" />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 >= 0.5 ? '★☆' : '☆☆'}
            </div>
            <p className="product-description">{product.description}</p>
            <p className="product-stock">
              In stock: {product.stock} items
            </p>
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, val));
                  }}
                  min="1"
                  className="qty-input"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="qty-btn">
                  +
                </button>
              </div>
            </div>
            <button onClick={handleAddToCart} className="btn-primary btn-block">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;