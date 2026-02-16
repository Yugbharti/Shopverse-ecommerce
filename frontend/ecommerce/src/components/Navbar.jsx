import React, { useContext, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { BsCartCheck } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { BsShopWindow } from "react-icons/bs";
import { VscPackage } from "react-icons/vsc";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { CartContext } from "../CartProvider";

const Navbar = () => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const cart = cartItems?.[0];
  const items = cart?.cart_items || [];
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <h1 className="logo" onClick={() => navigate("/")}>
        ShopVerse
      </h1>
      <div className="nav-actions">
        <div className="nav-act">
          {/* Shop */}
          <div className="nav-item">
            <span className="nav-icon">
              <BsShopWindow onClick={() => navigate("/register/seller")} />
            </span>
          </div>

          {/* Account */}
          <div className="nav-item">
            <span className="nav-icon">
              <VscAccount />
            </span>
            <div className="dropdown">
              <p onClick={() => navigate("/profile")}>
                <VscAccount className="small-icons" />
                Profile
              </p>
              <p onClick={() => navigate("/orders")}>
                <VscPackage className="small-icons" />
                Orders
              </p>
              <p onClick={() => navigate("/payments")}>
                <RiSecurePaymentLine className="small-icons" />
                Payment History
              </p>
              <p onClick={() => navigate("/wishlist")}>
                <FaRegHeart className="small-icons" />
                WishList
              </p>
            </div>
          </div>

          {/* Cart */}
          <div className="nav-item">
            <span className="nav-icon">
              <BsCartCheck onClick={() => navigate("/cart")} />
              {items.length > 0 && (
                <span className="cart-count">{items.length}</span>
              )}
            </span>
            <div className="dropdown">
              <p onClick={() => navigate("/cart")}>View Cart</p>
            </div>
          </div>
        </div>
        {!isLoggedIn && (
          <>
            <button className="btn login" onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="btn register"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
