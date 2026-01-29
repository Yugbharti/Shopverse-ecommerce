import React, { useState } from "react";
import "../assets/Auth.css";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(0);
  const [success, setSuccess] = useState(false);
  const [pass2, setPass2] = useState(0);
  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (password != password2) {
      setPass2(1);
    } else {
      setErr("");
      setPass2(0);
      const userData = {
        username,
        email,
        password,
      };
      try {
        setLoading(1);
        const res = await axios.post(
          "http://127.0.0.1:8000/accounts/register/",
          userData,
        );
        setErr({});
        setSuccess(true);
      } catch (err) {
        setErr(err.response.data);
        console.log(err);
      } finally {
        setLoading(0);
      }
      console.log(userData);
    }
  };
  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form className="auth-form" onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="erros-msg">
            {err.username && <div>{err.username}</div>}
          </p>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>{err.email && <div>{err.email}</div>}</small>
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <small>{pass2 ? "Both password must match." : ""}</small>
        </div>

        <div className="success-message">
          <small>
            {success && "Registration successful. You can now log in."}
          </small>
        </div>

        <button type="submit">
          {loading ? <p>Please Wait..</p> : <p>Register</p>}
        </button>
      </form>
    </div>
  );
};

export default Register;
