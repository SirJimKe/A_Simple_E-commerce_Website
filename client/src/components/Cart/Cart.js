import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
