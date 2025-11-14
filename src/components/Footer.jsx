// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        background: "#f5f5f5",
        color: "#555",
        borderTop: "1px solid #ddd"
      }}
    >
      <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </footer>
  );
}
