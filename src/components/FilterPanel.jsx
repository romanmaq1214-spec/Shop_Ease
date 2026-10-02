import { useState } from 'react';

const FilterPanel = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');

  const handleFilterChange = () => {
    onFilterChange({ selectedCategory, priceRange, sortBy });
  };

  return (
    <aside className="filter-panel">
      <h3 className="filter-title">Filters</h3>

      {/* Category Filter */}
      <div className="filter-section">
        <label className="filter-label">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <label className="filter-label">Price Range:</label>
        <div className="price-range">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => {
              const newRange = [parseInt(e.target.value) || 0, priceRange[1]];
              setPriceRange(newRange);
            }}
            className="price-input"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => {
              const newRange = [priceRange[0], parseInt(e.target.value) || 1000];
              setPriceRange(newRange);
            }}
            className="price-input"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="filter-section">
        <label className="filter-label">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <button onClick={handleFilterChange} className="filter-button">
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterPanel;