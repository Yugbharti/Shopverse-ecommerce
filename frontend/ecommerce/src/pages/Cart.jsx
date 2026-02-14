import React, { useEffect, useState } from "react";
import "../assets/Cart.css";
import axiosInstance from "../axiosInstance";
const Cart = () => {
  const len = 10;
  const [cartItems, setCartItem] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log("fetching items...");
        const res = await axiosInstance.get("/api/cart/items/");
        setCartItem(res.data);
        console.log("items fetched !!");
      } catch (err) {
        console.log("cant fetch items.");
        console.log(err);
        setError("Failed to load orders history");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  if (cartItems.length === 0) {
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
  const cart = cartItems?.[0];
  const items = cart?.cart_items || [];
  return (
    <div className="cart-page">
      <h2 className="cart-title">My Cart</h2>

      {items.map((item, index) => (
        <div className="cart-item" key={index}>
          <div className="cart-image">
            <img
              src={item.product_details?.images?.[0]?.image_url}
              alt={item.product_details?.name}
            />
          </div>

          <div className="cart-info">
            <h3 className="cart-product-name">{item.product_details?.name}</h3>

            <div className="cart-bottom">
              <span className="cart-price">₹{item.product_details?.price}</span>

              <div className="cart-actions">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="buy-btn">Proceed to buy</button>
    </div>
  );
};

export default Cart;
