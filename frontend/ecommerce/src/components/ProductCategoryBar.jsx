import React, { useState } from "react";
import "../assets/ProductCategoryBar.css";
import axiosInstance from "../axiosInstance";

const ProductCategoryBar = ({ title, products = [] }) => {
  const [product_id, setProductId] = useState();
  const [quantities, setQuantities] = useState({});
  if (!products || products.length === 0) return null;
  const handleAddtoCart = async (productId, newQuantity) => {
    try {
      setProductId(productId);
      setQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(0, newQuantity),
      }));
      const data = {
        product: productId,
        quantity: newQuantity,
      };
      console.log(data);
      const res = await axiosInstance.post("api/cart/items/create", data);
      console.log("success.", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-bar">
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <button className="view-all-link">View All →</button>
      </div>

      <div className="product-scroll">
        {products.map((product, index) => {
          // Access the first image safely from your array structure
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
                {quantity == 0 ? (
                  <button
                    className="add-btn"
                    onClick={() => handleAddtoCart(productId, 1)}
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
