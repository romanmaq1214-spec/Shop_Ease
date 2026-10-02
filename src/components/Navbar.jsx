import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ShopEase
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/cart" className="nav-link">
            Cart
            <span className="cart-badge">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;