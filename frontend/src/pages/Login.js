import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { AppContext } from "../context/AppContext";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { saveUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter email and password!");
      return;
    }

    try {
      setLoading(true);
      const data = await login({ email, password });

      if (data && data.user) {
        await saveUser(data.user);
        navigate("/");
      } else {
        setErrorMsg("Email not registered. Please signup first.");
      }
    } catch (err) {
      if (err.message === "User not found") {
        setErrorMsg("Email not registered. Please signup first.");
      } else {
        setErrorMsg(err.message || "Server error. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel auth-panel-compact" onSubmit={handleLogin}>
        <h1 className="auth-title">VOXI</h1>
        <p className="auth-subtitle">AAC Communication App for everyone</p>

        {errorMsg ? <p className="auth-error">{errorMsg}</p> : null}

        <label className="auth-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </main>
  );
}
