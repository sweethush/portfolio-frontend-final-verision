import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Blog.css"; // ⭐ 新增：引入样式文件

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api
      .get("/blog")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog</h1>

      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs found.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((b) => (
            <div key={b._id} className="blog-card">
              <h2 className="blog-card-title">{b.title}</h2>

              <p className="blog-card-preview">
                {b.content?.slice(0, 90)}...
              </p>

              <Link to={`/blog/${b._id}`} className="blog-btn">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
