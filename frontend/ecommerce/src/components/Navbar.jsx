import React, { useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { BsCartCheck } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { BsShopWindow } from "react-icons/bs";
import { VscPackage } from "react-icons/vsc";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";

const Navbar = () => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
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
            </span>
            <div className="dropdown">
              <p onClick={() => navigate("/cart")}>View Cart</p>
              <p onClick={() => navigate("/checkout")}>Checkout</p>
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
