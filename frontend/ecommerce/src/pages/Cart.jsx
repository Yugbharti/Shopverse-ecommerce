import React, { useState } from "react";
import "../assets/Cart.css";
const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  if (cartItem.length === 0) {
    return (
      <div className="empty-orders-container">
        <div className="empty-orders-content">
          <div className="icon-circle">
            <i className="shopping-bag-icon">🛍️</i>
          </div>
          <h3>No items Yet</h3>
          <p>
            Looks like you haven't added any product. Start shopping to fill
            this up!
          </p>
          <button
            className="shop-now-btn"
            onClick={() => (window.location.href = "/")}
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }
  return (
    <div class="cart-page">
      <h2 class="cart-title">My Cart</h2>

      <div class="cart-items">
        <div class="cart-item">
          <div class="cart-image">
            <img src="product.jpg" alt="product" />
          </div>

          <div class="cart-info">
            <h3 class="cart-product-name">Wireless Headphones</h3>
            <p class="cart-product-desc">Noise cancelling headphones</p>

            <div class="cart-bottom">
              <span class="cart-price">₹2999</span>

              <div class="cart-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
