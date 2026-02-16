import { createContext, useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [product_id, setProductId] = useState();
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log("fetching items...");
        const res = await axiosInstance.get("/api/cart/items/");
        setCartItems(res.data);
        console.log(res.data);
        console.log("items fetched !!");
      } catch (err) {
        console.log("cant fetch items.");
        console.log(err);
      }
    };
    fetchCartItems();
  }, []);

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
    <CartContext.Provider
      value={{
        cartItems,
        handleAddtoCart,
        quantities,
        product_id,
        setProductId,
        setQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
