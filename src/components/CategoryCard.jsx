import { Link } from 'react-router-dom';

const CategoryCard = ({ category, productCount }) => {
  return (
    <Link to={`/shop?category=${category}`} className="category-card">
      <div className="category-card-content">
        <h3 className="category-title">{category}</h3>
        <p className="category-count">{productCount} products</p>
      </div>
    </Link>
  );
};

export default CategoryCard;