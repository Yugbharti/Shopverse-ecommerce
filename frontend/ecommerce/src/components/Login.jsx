import React, { useContext, useState } from "react";
import "../assets/Auth.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(0);
  const [err, setErr] = useState({});
  const [success, setSuccess] = useState(false);
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      setLoading(1);
      const res = await axiosInstance.post("/api/token/", userData);
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      setSuccess(true);
      setisLoggedIn(true);
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
      console.error(error);
    } finally {
      setLoading(0);
    }
  };
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="errors-msg">{err.detail && <div>{err.detail}</div>}</p>
        </div>
        <div className="success-message">
          <small>{success && "Logged In successfully."}</small>
        </div>
        <button type="submit">
          {loading ? <p>Please Wait..</p> : <p>Login</p>}
        </button>
      </form>
    </div>
  );
};

export default Login;
