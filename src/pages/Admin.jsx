import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Admin() {
  const { user, token } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);

  // 加载 Blog + Projects
  useEffect(() => {
    if (!token) return;

    api.get("/blog")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Failed to load blogs:", err));

    api.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Failed to load projects:", err));
  }, [token]);

  // 删除 Blog
  const deleteBlog = (id) => {
    if (!window.confirm("Delete this blog?")) return;

    api.delete(`/blog/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setBlogs(prev => prev.filter(b => b._id !== id)))
      .catch(err => console.error(err));
  };

  // 删除 Project
  const deleteProject = (id) => {
    if (!window.confirm("Delete this project?")) return;

    api.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setProjects(prev => prev.filter(p => p._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        Admin Dashboard
      </h1>
      <p style={{ marginBottom: "20px" }}>Welcome, {user?.username}!</p>

      {/* Projects Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Manage Projects
        </h2>

        <Link
          to="/create-project"
          style={{
            display: "inline-block",
            padding: "8px 12px",
            background: "#5a0ea0",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            marginBottom: "15px",
          }}
        >
          + Create Project
        </Link>

        <ul style={{ marginTop: "15px" }}>
          {projects.map((p) => (
            <li
              key={p._id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "10px",
                background: "#fafafa",
              }}
            >
              <strong>{p.title}</strong>

              <Link
                to={`/projects/${p._id}/edit`}
                style={{ marginLeft: "15px", color: "#2563eb" }}
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProject(p._id)}
                style={{
                  marginLeft: "15px",
                  padding: "4px 10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Blogs Section */}
      <section>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Manage Blog Posts
        </h2>

        <Link
          to="/create-blog"
          style={{
            display: "inline-block",
            padding: "8px 12px",
            background: "#5a0ea0",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            marginBottom: "15px",
          }}
        >
          + Create Blog Post
        </Link>

        <ul style={{ marginTop: "15px" }}>
          {blogs.map((b) => (
            <li
              key={b._id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "10px",
                background: "#fafafa",
              }}
            >
              <strong>{b.title}</strong>

              <Link
                to={`/blog/${b._id}/edit`}
                style={{ marginLeft: "15px", color: "#2563eb" }}
              >
                Edit
              </Link>

              <button
                onClick={() => deleteBlog(b._id)}
                style={{
                  marginLeft: "15px",
                  padding: "4px 10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
