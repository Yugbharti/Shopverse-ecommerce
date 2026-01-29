import { useEffect, useState } from "react";
import ProductCategoryBar from "../components/ProductCategoryBar";
import axios from "axios";
import LoadingBar from "../components/LoadingBar";
import axiosInstance from "../axiosInstance";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [product2, setProducts2] = useState([]);
  const [product3, setProducts3] = useState([]);
  const [product4, setProducts4] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/products?category=mobile/",
        );
        setProducts(res.data);
        const res2 = await axios.get(
          "http://127.0.0.1:8000/api/products/?category=groceries",
        );
        setProducts2(res2.data);
        const res3 = await axios.get(
          "http://127.0.0.1:8000/api/products/?category=laptops",
        );
        setProducts3(res3.data);
        const res4 = await axios.get(
          "http://127.0.0.1:8000/api/products/?category=vegetables",
        );
        setProducts4(res4.data);
      } catch (e) {
        setError("Some error occured.");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingBar />
      ) : (
        <>
          <ProductCategoryBar title="Groceries" products={product2} />
          <ProductCategoryBar title="Fresh Vegetables" products={product4} />
          <ProductCategoryBar title="Best Laptops" products={product3} />
          <ProductCategoryBar title="Mobile Deals" products={products} />
        </>
      )}
    </>
  );
};

export default Home;
