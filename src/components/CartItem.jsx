import { useState } from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemoveFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        <div className="cart-item-controls">
          <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="qty-button">
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            className="qty-input"
          />
          <button onClick={() => setQuantity(quantity + 1)} className="qty-button">
            +
          </button>
          <button onClick={handleRemove} className="remove-button">
            Remove
          </button>
        </div>
      </div>
      <p className="cart-item-total">
        Total: ${(item.price * quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartItem;