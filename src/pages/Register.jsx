import { useState } from "react";
import api from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    api
      .post("/users/register", { username, email, password })
      .then(() => {
        setMessage("Registration successful! You can now log in.");
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        setMessage("Registration failed. Try another email or username.");
      });
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "60px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fafafa",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#5a0ea0",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
