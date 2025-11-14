import { useState } from "react";
import api from "../api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !msg) {
      setStatus("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await api.post("/contact", { name, email, message: msg });

      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMsg("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fafafa",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Me</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Message */}
        <textarea
          placeholder="Your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={5}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#5a0ea0",
            color: "white",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* 状态文本 */}
      {status && (
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            color: status.includes("successfully") ? "green" : "red",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}
