import React from "react";
import "../assets/ProductCategoryBar.css";

const ProductCategoryBar = ({ title, products = [] }) => {
  if (!products || products.length === 0) return null;
  const handleAddtoCart = () => {};

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
          return (
            <div className="product-card" key={uniqueKey}>
              <div className="image-wrapper">
                <img
                  src={firstImage || "https://via.placeholder.com/200"}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div className="product-details">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <button class="add-btn" onClick={handleAddtoCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategoryBar;
