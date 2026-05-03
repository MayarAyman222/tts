import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import "./Auth.css";

const patientTypes = [
  { label: "Select patient type", value: "" },
  { label: "AUTISM", value: "AUTISM" },
  { label: "STROKE", value: "STROKE" },
  { label: "ALZHEIMER", value: "ALZHEIMER" },
  { label: "SPEECH_DELAY", value: "SPEECH_DELAY" },
  { label: "OTHER", value: "OTHER" },
];

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [condition, setCondition] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (!firstName || !lastName || !email || !password || !condition) {
      setErrorMsg("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      await signup({
        firstName,
        lastName,
        email,
        password,
        condition,
      });

      navigate("/login");
    } catch (err) {
      setErrorMsg(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSignup}>
        <h1 className="auth-title">VOXI</h1>
        <p className="auth-subtitle">AAC Communication App - Create Account</p>

        {errorMsg ? <p className="auth-error">{errorMsg}</p> : null}

        <label className="auth-field">
          <span>First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="given-name"
          />
        </label>

        <label className="auth-field">
          <span>Last Name</span>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            autoComplete="family-name"
          />
        </label>

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
            autoComplete="new-password"
          />
        </label>

        <label className="auth-field">
          <span>Patient Type</span>
          <select
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          >
            {patientTypes.map((item) => (
              <option key={item.value || "empty"} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
