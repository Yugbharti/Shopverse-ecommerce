import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "../assets/Profile.css";
import { CiLogout } from "react-icons/ci";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  if (!isLoggedIn) {
    return (
      <p className="profile-loading">
        <img
          src="https://res.cloudinary.com/dbhge9dnm/image/upload/v1769519466/lgn_ow9sef.png"
          alt="login-first"
        />
      </p>
    );
  }
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setisLoggedIn(false);
    navigate("/login");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axiosInstance.get("/accounts/profile/users/me");
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <img
          src="https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile"
          className="profile-avatar"
        />
        <div>
          <h2>Hello, 👋</h2>
          <h1>{user.username}</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-section">
          <h3>Personal Details</h3>

          {isEditing ? (
            <>
              <input name="name" value={user.name} onChange={handleChange} />
              <input name="email" value={user.email} onChange={handleChange} />
              <input name="phone" value={user.phone} onChange={handleChange} />
              <button
                className="btn primary"
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <button
                className="btn secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        <div className="profile-section">
          <h3>Order Details</h3>
          <p>
            📦 Total Orders: <strong>{user.total_orders}</strong>
          </p>
          <p>
            🚚 Last Order: <strong>Delivered</strong>
          </p>
        </div>

        <div className="profile-section">
          <h3>Payment History</h3>
          <p>
            💳 Successful Payments: <strong>0</strong>
          </p>
          <p>
            💰 Pending Payments: <strong>0</strong>
          </p>
        </div>

        <button className="btn danger logout-btn" onClick={handleLogout}>
          {" "}
          <CiLogout className="icons" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
