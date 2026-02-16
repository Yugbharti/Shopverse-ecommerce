export const handleAddtoCart = async (productId, newQuantity) => {
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
