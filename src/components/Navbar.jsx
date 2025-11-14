import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, token, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="nav-logo" to="/">MyPortfolio</Link>

        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/projects">Projects</Link>
        <Link className="nav-item" to="/blog">Blog</Link>

        {token && (
          <>
            <Link className="nav-item" to="/create-blog">Create Blog</Link>
            <Link className="nav-item" to="/create-project">Create Project</Link>
            <Link className="nav-item" to="/admin">Admin</Link>
          </>
        )}

        <Link className="nav-item" to="/contact">Contact</Link>
      </div>

      <div className="nav-right">
        {token ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="auth-btn login" to="/login">Login</Link>
            <Link className="auth-btn register" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
