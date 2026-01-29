// import React, { useEffect, useState } from "react";
// import "../assets/Order.css";
// import axiosInstance from "../axiosInstance";
// toUpperCase;
// const Order = () => {
//   const [order, setOrder] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get("/api/orders/");
//         setOrder(res.data);
//         setError({});
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOrders();
//   }, []);
//   return (
//     <div className="order-container">
//       <h2>Order Details</h2>

//       {/* Order Summary */}
//       <div className="order-card">
//         <div className="row">
//           <span>Status:</span>
//           <span className={`status ${order.status}`}>{order.status}</span>
//         </div>
//         <div className="row">
//           <span>Payment Status:</span>
//           <span>{order.payment_status}</span>
//         </div>
//         <div className="row">
//           <span>Payment Method:</span>
//           <span>{order.payment_method.toUpperCase()}</span>
//         </div>
//       </div>

//       {/* Items */}
//       <div className="order-card">
//         <h3>Items</h3>

//         {order.order_items.map((item) => (
//           <div className="item" key={item.id}>
//             <div>
//               <p className="product-id">{item.product}</p>
//               <p className="qty">Qty: {item.quantity}</p>
//             </div>
//             <div className="price">₹{item.total_price}</div>
//           </div>
//         ))}
//       </div>

//       {/* Price Breakdown */}
//       <div className="order-card">
//         <h3>Price Details</h3>
//         <div className="row">
//           <span>Subtotal</span>
//           <span>₹{subtotal}</span>
//         </div>
//         <div className="row">
//           <span>Tax</span>
//           <span>₹{order.tax_amount}</span>
//         </div>
//         <div className="row">
//           <span>Discount</span>
//           <span>-₹{order.discount_amount}</span>
//         </div>
//         <div className="row">
//           <span>Shipping</span>
//           <span>₹{order.shipping_charge}</span>
//         </div>

//         <hr />

//         <div className="row total">
//           <span>Total Payable</span>
//           <span>₹{finalAmount}</span>
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
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/api/orders/");
        setOrder(res.data[0]);
      } catch (err) {
        console.log(err);
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingBar />;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found</p>;

  const subtotal = order.total_amount.total_price__sum;
  const finalAmount = order.final_amount.total_price__sum;
  const taxAmount = order.tax_amount;
  const discount = order.discount_amount;
  const shipping = order.shipping_charge;
  return (
    <div className="order-container">
      <h2>Order Details</h2>

      {/* Order Summary */}
      <div className="order-card">
        <div className="row">
          <span>Status:</span>
          <span className={`status ${order.status}`}>{order.status}</span>
        </div>
        <div className="row">
          <span>Payment Status:</span>
          <span>{order.payment_status}</span>
        </div>
        <div className="row">
          <span>Payment Method:</span>
          <span>{order.payment_method?.toUpperCase()}</span>
        </div>
      </div>

      {/* Items */}
      <div className="order-card">
        <h3>Items</h3>

        {order.order_items.map((item) => (
          <div className="item" key={item.id}>
            <div>
              <p className="product-id">{item.product}</p>
              <p className="qty">Qty: {item.quantity}</p>
            </div>
            <div className="price">₹{item.total_price}</div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="order-card">
        <h3>Price Details</h3>
        <div className="row">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
        <div className="row">
          <span>Tax</span>
          <span>₹{taxAmount}</span>
        </div>
        <div className="row">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>
        <div className="row">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </div>

        <hr />

        <div className="row total">
          <span>Total Payable</span>
          <span>{finalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Order;
