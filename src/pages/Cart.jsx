import { useState } from 'react';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import Modal from '../components/Modal';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="cart-page">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <a href="/shop" className="btn-primary">Continue Shopping</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    // In a real app, you might add taxes and shipping
    return calculateSubtotal();
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </div>
          <div className="cart-summary">
            <p className="cart-subtotal">
              Subtotal: ${calculateSubtotal().toFixed(2)}
            </p>
            <p className="cart-total">
              Total: ${calculateTotal().toFixed(2)}
            </p>
            <div className="cart-actions">
              <button onClick={onClearCart} className="btn-outline">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
      >
        <div className="modal-checkout">
          <h2>Order Summary</h2>
          <p>Thank you for your purchase!</p>
          <p>Your order has been placed successfully.</p>
          <p>
            <strong>Total Paid:</strong> ${calculateTotal().toFixed(2)}
          </p>
          <button onClick={() => {
            setShowCheckoutModal(false);
            onClearCart(); // Clear cart after checkout
          }} className="btn-primary">
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;