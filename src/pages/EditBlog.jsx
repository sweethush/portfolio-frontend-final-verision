import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();   // ← 从 Context 获取 token

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  // 加载原始内容
  useEffect(() => {
    api
      .get(`/blog/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.error("Failed to load blog:", err));
  }, [id]);

  // 更新博客
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to edit.");
      return;
    }

    api
      .put(
        `/blog/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setMessage("Blog updated!");
        setTimeout(() => navigate("/admin"), 800);  // ← 返回 admin
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to update.");
      });
  };

  return (
    <div>
      <h1>Edit Blog</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />

        <button type="submit">Update</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
