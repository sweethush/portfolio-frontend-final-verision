import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [message, setMessage] = useState("");

  // 读取博客 + 评论（安全版本）
  const loadBlog = () => {
    api
      .get(`/blog/${id}`)
      .then((res) => {
        const safeBlog = {
          ...res.data,
          comments: Array.isArray(res.data.comments)
            ? res.data.comments
            : [],
        };
        setBlog(safeBlog);
      })
      .catch((err) => {
        console.error("Failed to fetch blog:", err);
        setMessage("Failed to load blog.");
      });
  };

  useEffect(() => {
    loadBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  // 提交评论
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to comment.");
      return;
    }

    api
      .post(
        `/blog/${id}/comments`,
        { body: newComment }, // ⭐必须叫 body
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setNewComment("");
        loadBlog();
      })
      .catch(() => setMessage("Failed to post comment."));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>{blog.title}</h1>
      <p style={{ marginTop: "10px" }}>{blog.content}</p>

      <h2 style={{ fontSize: "24px", marginTop: "30px" }}>Comments</h2>

      {blog.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {blog.comments.map((c) => (
            <li
              key={c._id}
              style={{
                padding: "10px",
                marginTop: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      {message && (
        <p style={{ color: "red", marginTop: "10px" }}>{message}</p>
      )}

      <form onSubmit={handleCommentSubmit} style={{ marginTop: "20px" }}>
        <textarea
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
