import { useEffect, useState } from 'react';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // Count products per category
  const categoryCounts = {};
  products.forEach(product => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);

  // Get popular categories (top 3 by product count)
  const popularCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category);

  // Get new arrivals (last 8)
  const newArrivals = products.slice(Math.max(products.length - 8, 0));

  return (
    <>
      <Navbar />
      <main className="home-page">
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to ShopEase</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <a href="/shop" className="btn-primary">Shop Now</a>
        </section>

        {/* Search Bar */}
        <section className="search-section">
          <SearchBar onSearch={setSearchQuery} />
        </section>

        {/* Featured Products */}
        <section className="featured-section">
          <h2 className="section-title">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
        </section>

        {/* Popular Categories */}
        <section className="categories-section">
          <h2 className="section-title">Popular Categories</h2>
          <div className="category-grid">
            {popularCategories.map(category => (
              <CategoryCard
                key={category}
                category={category}
                productCount={categoryCounts[category]}
              />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="new-arrivals-section">
          <h2 className="section-title">New Arrivals</h2>
          <ProductGrid products={newArrivals} />
        </section>

        {/* Call-to-Action */}
        <section className="cta-section">
          <h2>Ready to upgrade your lifestyle?</h2>
          <p>Shop our latest collection and enjoy free shipping on orders over $50</p>
          <a href="/shop" className="btn-secondary">Explore Collection</a>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;