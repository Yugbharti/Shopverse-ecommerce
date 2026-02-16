import React, { useContext, useState } from "react";
import "../assets/ProductCategoryBar.css";
import axiosInstance from "../axiosInstance";
import { handleAddtoCart } from "../logic/Cartfunctions";
import { FaStar } from "react-icons/fa6";
import { CartContext } from "../CartProvider";

const ProductCategoryBar = ({ title, products = [] }) => {
  const { handleAddtoCart, quantities, product_id, setProductId, setQuantity } =
    useContext(CartContext);
  if (!products || products.length === 0) return null;
  return (
    <div className="category-bar">
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <button className="view-all-link">View All →</button>
      </div>

      <div className="product-scroll">
        {products.map((product, index) => {
          const firstImage = product.images?.[0]?.image_url;
          const uniqueKey = product.images?.[0]?.product || `prod-${index}`;
          const productId = product.images?.[0]?.product;
          const quantity = quantities[product.id] || 0;
          return (
            <div className="product-card" key={uniqueKey}>
              <div className="image-wrapper">
                <img
                  src={firstImage || "https://via.placeholder.com/200"}
                  alt={product.name}
                  loading="lazy"
                />
                <span className="icon-star">
                  <FaStar className="icon-star-main" />
                  <span>4.5</span>
                </span>
                {quantity == 0 ? (
                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddtoCart(productId, 1);
                    }}
                  >
                    +
                  </button>
                ) : (
                  <>
                    <button
                      className="add-btn"
                      onClick={() => handleAddtoCart(productId, quantity - 1)}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      className="add-btn"
                      onClick={() => handleAddtoCart(productId, quantity + 1)}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
              <div className="product-details">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategoryBar;
