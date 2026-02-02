// import React, { useEffect, useState } from "react";
// import "../assets/Order.css";
// import axiosInstance from "../axiosInstance";
// import LoadingBar from "../components/LoadingBar";

// const Order = () => {
//   const [orders, setOrders] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get("/api/orders/");
//         setOrders(res.data);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to load order");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <LoadingBar />;
//   if (error) return <p>{error}</p>;
//   if (!orders) return <p>No order found</p>;

//   const subtotal = orders.total_amount;
//   const finalAmount = orders.final_amount;
//   const taxAmount = orders.tax_amount;
//   const discount = orders.discount_amount;
//   const shipping = orders.shipping_charge;
//   return (
//     <div className="order-container">
//       <h2>Order Details</h2>

//       {/* Order Summary */}
//       <div className="order-card">
//         <div className="row">
//           <span>Status:</span>
//           <span className={`status ${orders.status}`}>{orders.status}</span>
//         </div>
//         <div className="row">
//           <span>Payment Status:</span>
//           <span>{orders.payment_status}</span>
//         </div>
//         <div className="row">
//           <span>Payment Method:</span>
//           <span>{orders.payment_method?.toUpperCase()}</span>
//         </div>
//       </div>

//       {/* Items */}
//       <div className="order-card">
//         <h3>Items</h3>
//         {orders.map((order, orderIndex) => (
//           <div className="order" key={orderIndex}>
//             <h3>Order Total: ₹{order.final_amount}</h3>

//             {order.order_items.map((item) => (
//               <div className="item" key={item.id}>
//                 <div>
//                   <p className="product-id">{item.product.name}</p>

//                   <img
//                     src={item.product.images?.[0]?.image_url}
//                     alt={item.product.name}
//                     className="img-product"
//                   />

//                   <p className="qty">Qty: {item.quantity}</p>
//                 </div>

//                 <div className="price">₹{item.total_price}</div>
//               </div>
//             ))}
//           </div>
//         ))}
//         {/*
//         {order.map((ord) =>
//           ord.order_items.map((item) => (
//             <div className="item" key={item.id}>
//               <div>
//                 <p className="product-id">{item.product.name}</p>

//                 <img
//                   src={item.product.images?.[0]?.image_url}
//                   alt={item.product.name}
//                   className="img-product"
//                 />

//                 <p className="qty">Qty: {item.quantity}</p>
//               </div>

//               <div className="price">₹{item.total_price}</div>
//             </div>
//           )),
//         )} */}
//       </div>

//       {/* Price Breakdown */}
//       <div className="order-card">
//         <h3>Price Details</h3>
//         <div className="row">
//           <span>Subtotal</span>
//           <span>{subtotal}</span>
//         </div>
//         <div className="row">
//           <span>Tax</span>
//           <span>₹{taxAmount}</span>
//         </div>
//         <div className="row">
//           <span>Discount</span>
//           <span>-₹{discount}</span>
//         </div>
//         <div className="row">
//           <span>Shipping</span>
//           <span>₹{shipping}</span>
//         </div>

//         <hr />

//         <div className="row total">
//           <span>Total Payable</span>
//           <span>{finalAmount}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;

import React, { useEffect, useState } from "react";
import "../assets/Order.css";
import axiosInstance from "../axiosInstance";
import LoadingBar from "../components/LoadingBar";

const Order = () => {
  const [orders, setOrders] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/api/orders/");
        setOrders(res.data);
      } catch (err) {
        setError("Failed to load orders history");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingBar />;
  if (error) return <p className="error-msg">{error}</p>;
  if (orders.length === 0) {
    return (
      <div className="empty-orders-container">
        <div className="empty-orders-content">
          <div className="icon-circle">
            <i className="shopping-bag-icon">🛍️</i>
          </div>
          <h3>No Orders Yet</h3>
          <p>
            Looks like you haven't placed any orders. Start shopping to fill
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
    <div className="order-history-container">
      <h2 className="page-title">My Orders</h2>

      {orders.map((order) => (
        <div className="order-master-card" key={order.id}>
          {/* Header: Order Info & Status */}
          <div className="order-header">
            <div className="order-meta">
              <span className="order-id">Order ID: {order.order_number}</span>
              <span className="order-date">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className={`status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </div>
          </div>

          {/* Body: Items List */}
          <div className="items-section">
            {order.order_items.map((item) => (
              <div className="item-row" key={item.id}>
                <img
                  src={
                    item.product.images?.[0]?.image_url ||
                    "https://via.placeholder.com/80"
                  }
                  alt={item.product.name}
                  className="product-thumb"
                />
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">₹{item.total_price}</div>
              </div>
            ))}
          </div>

          {/* Footer: Summary & Payment */}
          <div className="order-footer">
            <div className="payment-info">
              <p>
                Payment: <strong>{order.payment_method?.toUpperCase()}</strong>
              </p>
              <p>
                Status: <span className="p-status">{order.payment_status}</span>
              </p>
            </div>
            <div className="price-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{order.total_amount}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Amount:</span>
                <span className="final-price">₹{order.final_amount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
