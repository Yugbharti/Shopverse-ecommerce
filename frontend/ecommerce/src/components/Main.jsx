import React from "react";
import "../App.css";
import Home from "../pages/Home";

const Main = () => {
  return (
    <main className="main">
      <h1>Welcome to ShopVerse</h1>
      <p>Your one-stop destination for everything you need.</p>
      <Home></Home>
    </main>
  );
};

export default Main;
