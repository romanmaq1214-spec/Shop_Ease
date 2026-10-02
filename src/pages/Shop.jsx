import { useEffect, useState } from 'react';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ProductGrid from '../components/ProductGrid';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    selectedCategory: 'all',
    priceRange: [0, 1000],
    sortBy: 'default'
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get unique categories from all products
  const allCategories = [...new Set(products.map(p => p.category))];

  // Filter and sort products based on search and filters
  useEffect(() => {
    let result = [...products];

    // Apply search query
    if (searchQuery.trim() !== '') {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.selectedCategory !== 'all') {
      result = result.filter(product => product.category === filters.selectedCategory);
    }

    // Apply price range filter
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // default order (as in data)
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, filters]);

  return (
    <>
      <Navbar />
      <main className="shop-page">
        <div className="shop-container">
          {/* Sidebar with filters */}
          <aside className="shop-sidebar">
            <SearchBar onSearch={setSearchQuery} />
            <FilterPanel
              categories={allCategories}
              onFilterChange={setFilters}
            />
          </aside>

          {/* Main product grid */}
          <section className="shop-content">
            <div className="shop-header">
              <h1>Shop All Products</h1>
              <p>Showing {filteredProducts.length} products</p>
            </div>
            <ProductGrid products={filteredProducts} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;